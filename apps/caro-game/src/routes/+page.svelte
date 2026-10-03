<script lang="ts">
  import { onMount, onDestroy } from 'svelte';
  import { buildWebAppJsonLd, buildFaqJsonLd } from '@zero-effort/seo-config';
  import { AdBanner } from '@zero-effort/shared-ui';
  import { currentLang, translations } from '$lib/langStore';

  const BOARD_SIZE = 15;
  type Player = 'X' | 'O' | null;
  type GameMode = 'ai' | 'local2p' | 'online';

  let board: Player[][] = Array(BOARD_SIZE).fill(null).map(() => Array(BOARD_SIZE).fill(null));
  let currentPlayer: 'X' | 'O' = 'X';
  let myRole: 'X' | 'O' | 'spectator' = 'X';
  let winner: Player | 'Draw' = null;
  let winningCells: [number, number][] = [];
  let gameMode: GameMode = 'ai';
  let soundEnabled = true;
  let copied = false;

  // Key for reactive status message
  let statusKey: 'your_turn' | 'ai_thinking' | 'opponent_turn' | 'win_x' | 'win_o' | 'draw' | 'room_wait' | 'room_created' | 'room_not_found' | 'peer_disconnected' | 'connecting' | 'custom' = 'your_turn';
  let customStatus = '';

  $: t = translations[$currentLang];

  $: displayStatus = getStatusText(statusKey, $currentLang);

  function getStatusText(key: typeof statusKey, _l: string): string {
    if (key === 'your_turn') return t.turnYour;
    if (key === 'ai_thinking') return t.turnAiThinking;
    if (key === 'opponent_turn') return t.turnOpponent;
    if (key === 'win_x') return t.winMessage('X');
    if (key === 'win_o') return t.winMessage('O');
    if (key === 'draw') return t.drawMessage;
    if (key === 'room_created') return t.roomCreated;
    if (key === 'room_not_found') return t.roomNotFound;
    if (key === 'peer_disconnected') return t.peerDisconnected;
    if (key === 'connecting') return t.connectingRoom(roomId);
    return customStatus || t.turnPlayer(currentPlayer);
  }

  // P2P Multiplayer state
  let peer: any = null;
  let conn: any = null;
  let roomId = '';
  let isHost = false;
  let isConnectedPeer = false;
  let roomUrl = '';

  const jsonLdApp = buildWebAppJsonLd({
    name: 'Cờ Caro Online - Chơi Cờ Caro Miễn Phí Với AI & Bạn Bè (P2P)',
    url: 'https://caroonline.vn',
    description: 'Chơi cờ Caro (Gomoku) trực tuyến miễn phí 100% trên trình duyệt. Hỗ trợ tạo phòng đấu 1:1 thời gian thực với bạn bè qua liên kết P2P, không cần cài app.',
    applicationCategory: 'GameApplication',
    operatingSystem: 'All'
  });

  const jsonLdFaq = buildFaqJsonLd([
    {
      question: 'Làm thế nào để chơi cờ Caro với bạn bè từ xa?',
      answer: 'Rất đơn giản! Chỉ cần bấm [Tạo Phòng Online], sau đó gửi liên kết phòng cho bạn bè. Khi bạn bè bấm vào link, hai người sẽ được kết nối trực tiếp (P2P) để thi đấu ngay lập tức.'
    },
    {
      question: 'Chơi online có tốn tiền hay cần tải phần mềm không?',
      answer: 'Hoàn toàn miễn phí 100%, không cần đăng ký tài khoản và không cần cài đặt bất kỳ phần mềm nào.'
    }
  ]);

  onMount(async () => {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      const urlRoom = params.get('room');
      if (urlRoom) {
        joinOnlineRoom(urlRoom);
      }
    }
  });

  onDestroy(() => {
    cleanupPeer();
  });

  function cleanupPeer() {
    if (conn) {
      try { conn.close(); } catch (e) {}
      conn = null;
    }
    if (peer) {
      try { peer.destroy(); } catch (e) {}
      peer = null;
    }
    isConnectedPeer = false;
  }

  function playTone(freq: number, duration: number) {
    if (!soundEnabled || typeof window === 'undefined') return;
    try {
      const audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)();
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();
      osc.frequency.value = freq;
      gain.gain.setValueAtTime(0.08, audioCtx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + duration);
      osc.connect(gain);
      gain.connect(audioCtx.destination);
      osc.start();
      osc.stop(audioCtx.currentTime + duration);
    } catch (e) {}
  }

  async function initHostRoom() {
    cleanupPeer();
    gameMode = 'online';
    isHost = true;
    myRole = 'X';
    roomId = Math.random().toString(36).substring(2, 8).toUpperCase();
    roomUrl = `${window.location.origin}${window.location.pathname}?room=${roomId}`;
    statusKey = 'connecting';

    const { default: Peer } = await import('peerjs');
    peer = new Peer(`caro-room-${roomId}`);

    peer.on('open', () => {
      statusKey = 'room_created';
    });

    peer.on('connection', (connection: any) => {
      conn = connection;
      setupConnectionHandlers();
    });

    peer.on('error', (err: any) => {
      console.error('Peer error:', err);
      statusKey = 'room_not_found';
    });
  }

  async function joinOnlineRoom(targetRoomId: string) {
    cleanupPeer();
    gameMode = 'online';
    isHost = false;
    myRole = 'O';
    roomId = targetRoomId.toUpperCase();
    roomUrl = `${window.location.origin}${window.location.pathname}?room=${roomId}`;
    statusKey = 'connecting';

    const { default: Peer } = await import('peerjs');
    peer = new Peer();

    peer.on('open', () => {
      conn = peer.connect(`caro-room-${roomId}`);
      setupConnectionHandlers();
    });

    peer.on('error', (err: any) => {
      console.error('Peer join error:', err);
      statusKey = 'room_not_found';
    });
  }

  function setupConnectionHandlers() {
    conn.on('open', () => {
      isConnectedPeer = true;
      resetBoard();
      statusKey = isHost ? 'your_turn' : 'opponent_turn';
      playTone(587.33, 0.2); // D5 chime
    });

    conn.on('data', (data: any) => {
      if (data.type === 'MOVE') {
        applyRemoteMove(data.r, data.c, data.player);
      } else if (data.type === 'RESTART') {
        resetBoard();
        customStatus = t.opponentRestart;
        statusKey = 'custom';
      }
    });

    conn.on('close', () => {
      isConnectedPeer = false;
      statusKey = 'peer_disconnected';
    });
  }

  function resetBoard() {
    board = Array(BOARD_SIZE).fill(null).map(() => Array(BOARD_SIZE).fill(null));
    currentPlayer = 'X';
    winner = null;
    winningCells = [];
    if (gameMode === 'online') {
      statusKey = currentPlayer === myRole ? 'your_turn' : 'opponent_turn';
    } else {
      statusKey = 'your_turn';
    }
    playTone(440, 0.1);
  }

  function checkWin(r: number, c: number, p: 'X' | 'O'): [number, number][] | null {
    const directions = [
      [[0, 1], [0, -1]],
      [[1, 0], [-1, 0]],
      [[1, 1], [-1, -1]],
      [[1, -1], [-1, 1]]
    ];

    for (const dir of directions) {
      const line: [number, number][] = [[r, c]];
      for (const [dr, dc] of dir) {
        let step = 1;
        while (true) {
          const nr = r + dr * step;
          const nc = c + dc * step;
          if (nr >= 0 && nr < BOARD_SIZE && nc >= 0 && nc < BOARD_SIZE && board[nr][nc] === p) {
            line.push([nr, nc]);
            step++;
          } else {
            break;
          }
        }
      }
      if (line.length >= 5) {
        return line;
      }
    }
    return null;
  }

  function handleCellClick(r: number, c: number) {
    if (board[r][c] || winner) return;

    // In online mode, only allow clicks when it's your turn
    if (gameMode === 'online') {
      if (!isConnectedPeer) return;
      if (currentPlayer !== myRole) return;
    }

    board[r][c] = currentPlayer;
    playTone(currentPlayer === 'X' ? 523.25 : 659.25, 0.08);

    const winLine = checkWin(r, c, currentPlayer);

    if (winLine) {
      winner = currentPlayer;
      winningCells = winLine;
      statusKey = currentPlayer === 'X' ? 'win_x' : 'win_o';
      playTone(880, 0.3);

      if (gameMode === 'online' && conn && conn.open) {
        conn.send({ type: 'MOVE', r, c, player: currentPlayer });
      }
      return;
    }

    if (board.every(row => row.every(cell => cell !== null))) {
      winner = 'Draw';
      statusKey = 'draw';
      if (gameMode === 'online' && conn && conn.open) {
        conn.send({ type: 'MOVE', r, c, player: currentPlayer });
      }
      return;
    }

    // Broadcast move to peer if in online mode
    if (gameMode === 'online' && conn && conn.open) {
      conn.send({ type: 'MOVE', r, c, player: currentPlayer });
    }

    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';

    if (gameMode === 'online') {
      statusKey = currentPlayer === myRole ? 'your_turn' : 'opponent_turn';
    } else if (gameMode === 'ai') {
      if (currentPlayer === 'O') {
        statusKey = 'ai_thinking';
        setTimeout(makeAiMove, 250);
      } else {
        statusKey = 'your_turn';
      }
    } else {
      customStatus = t.turnPlayer(currentPlayer);
      statusKey = 'custom';
    }
  }

  function applyRemoteMove(r: number, c: number, p: 'X' | 'O') {
    if (board[r][c] || winner) return;

    board[r][c] = p;
    playTone(p === 'X' ? 523.25 : 659.25, 0.08);

    const winLine = checkWin(r, c, p);
    if (winLine) {
      winner = p;
      winningCells = winLine;
      statusKey = p === 'X' ? 'win_x' : 'win_o';
      playTone(880, 0.3);
      return;
    }

    if (board.every(row => row.every(cell => cell !== null))) {
      winner = 'Draw';
      statusKey = 'draw';
      return;
    }

    currentPlayer = p === 'X' ? 'O' : 'X';
    statusKey = currentPlayer === myRole ? 'your_turn' : 'opponent_turn';
  }

  function makeAiMove() {
    if (winner) return;

    let bestScore = -1;
    let bestMove: [number, number] | null = null;

    for (let r = 0; r < BOARD_SIZE; r++) {
      for (let c = 0; c < BOARD_SIZE; c++) {
        if (board[r][c] !== null) continue;

        let score = 0;
        score += Math.max(0, 7 - Math.abs(r - 7) - Math.abs(c - 7));

        for (let dr = -1; dr <= 1; dr++) {
          for (let dc = -1; dc <= 1; dc++) {
            const nr = r + dr;
            const nc = c + dc;
            if (nr >= 0 && nr < BOARD_SIZE && nc >= 0 && nc < BOARD_SIZE && board[nr][nc] !== null) {
              score += board[nr][nc] === 'O' ? 6 : 5;
            }
          }
        }

        if (score > bestScore) {
          bestScore = score;
          bestMove = [r, c];
        }
      }
    }

    if (bestMove) {
      handleCellClick(bestMove[0], bestMove[1]);
    }
  }

  function switchMode(mode: GameMode) {
    if (mode === 'online') {
      initHostRoom();
    } else {
      cleanupPeer();
      gameMode = mode;
      isHost = false;
      myRole = 'X';
      resetBoard();
    }
  }

  function requestNewGame() {
    resetBoard();
    if (gameMode === 'online' && conn && conn.open) {
      conn.send({ type: 'RESTART' });
    }
  }

  function shareLinkDirect() {
    if (typeof window !== 'undefined') {
      const shareLink = roomUrl || window.location.href;
      if (navigator.share) {
        navigator.share({
          title: t.siteTitle,
          text: t.heroDesc,
          url: shareLink
        }).catch(() => copyLink());
      } else {
        copyLink();
      }
    }
  }

  function copyLink() {
    if (typeof window !== 'undefined') {
      const shareLink = roomUrl || window.location.href;
      navigator.clipboard.writeText(shareLink);
      copied = true;
      setTimeout(() => (copied = false), 2000);
    }
  }
</script>

<svelte:head>
  <title>Cờ Caro Online - Chơi Đấu Trực Tuyến 1:1 Với Bạn Bè & AI</title>
  <meta name="description" content="Tạo phòng thi đấu cờ Caro 1:1 trực tiếp với bạn bè qua liên kết P2P hoặc đấu với AI. Tải ngay không cần cài đặt, không lag, miễn phí 100%." />
  <meta name="keywords" content="cờ caro online, chơi cờ caro bạn bè, tạo phòng cờ caro, cờ caro zalo, 베트남 오목, caro gomoku" />
  {@html `<script type="application/ld+json">${jsonLdApp}</script>`}
  {@html `<script type="application/ld+json">${jsonLdFaq}</script>`}
</svelte:head>

<div class="mx-auto max-w-4xl px-4 py-8 sm:px-6">
  <!-- Hero -->
  <div class="mb-6 flex flex-col items-center justify-between gap-4 sm:flex-row">
    <div>
      <div class="inline-flex items-center gap-1.5 rounded-full bg-red-100 px-3 py-0.5 text-xs font-bold text-red-800 mb-2">
        <span>{t.badgeTop}</span>
      </div>
      <h1 class="text-2xl font-black text-slate-900 sm:text-3xl">{t.heroTitle}</h1>
      <p class="text-sm text-slate-500">{t.heroDesc}</p>
    </div>

    <!-- Mode Selector -->
    <div class="flex flex-wrap items-center gap-2">
      <button
        type="button"
        class="rounded-lg border px-3 py-1.5 text-xs font-semibold shadow-xs transition {gameMode === 'online' ? 'bg-emerald-600 text-white border-emerald-600' : 'bg-white text-slate-700 hover:bg-slate-50'}"
        on:click={() => switchMode('online')}
      >
        {t.btnOnline}
      </button>

      <button
        type="button"
        class="rounded-lg border px-3 py-1.5 text-xs font-semibold shadow-xs transition {gameMode === 'ai' ? 'bg-indigo-600 text-white border-indigo-600' : 'bg-white text-slate-700 hover:bg-slate-50'}"
        on:click={() => switchMode('ai')}
      >
        {t.btnAi}
      </button>

      <button
        type="button"
        class="rounded-lg border px-3 py-1.5 text-xs font-semibold shadow-xs transition {gameMode === 'local2p' ? 'bg-indigo-600 text-white border-indigo-600' : 'bg-white text-slate-700 hover:bg-slate-50'}"
        on:click={() => switchMode('local2p')}
      >
        {t.btnLocal}
      </button>

      <button
        type="button"
        class="rounded-lg border border-slate-200 bg-white px-2.5 py-1.5 text-xs font-semibold text-slate-700 shadow-xs hover:bg-slate-50 transition"
        on:click={() => soundEnabled = !soundEnabled}
        title={t.btnSound}
      >
        {soundEnabled ? '🔊' : '🔇'}
      </button>

      <button
        type="button"
        class="rounded-lg bg-slate-900 px-3.5 py-1.5 text-xs font-semibold text-white shadow-xs hover:bg-slate-800 transition"
        on:click={requestNewGame}
      >
        {t.btnNewGame}
      </button>
    </div>
  </div>

  <!-- Online Room Banner (When in Online Mode) -->
  {#if gameMode === 'online'}
    <div class="mb-4 rounded-2xl bg-gradient-to-r from-emerald-500 to-teal-600 p-4 text-white shadow-md">
      <div class="flex flex-col sm:flex-row items-center justify-between gap-3">
        <div>
          <span class="inline-block rounded-md bg-white/20 px-2 py-0.5 text-[11px] font-bold uppercase tracking-wider">
            {t.roomTitle}: #{roomId || '---'}
          </span>
          <p class="text-xs text-white/90 mt-1">
            {#if isConnectedPeer}
              {t.roomConnected} <strong class="text-amber-200 text-sm">[{myRole}]</strong>
            {:else}
              {t.roomWait}
            {/if}
          </p>
        </div>

        <div class="flex items-center gap-2">
          <button
            type="button"
            class="rounded-lg bg-white px-3.5 py-1.5 text-xs font-black text-emerald-800 shadow-xs hover:bg-emerald-50 transition"
            on:click={copyLink}
          >
            {copied ? t.btnCopied : t.btnCopyLink}
          </button>
          <button
            type="button"
            class="rounded-lg bg-blue-600 px-3.5 py-1.5 text-xs font-black text-white shadow-xs hover:bg-blue-700 transition"
            on:click={shareLinkDirect}
          >
            {t.btnShareZalo}
          </button>
        </div>
      </div>
    </div>
  {/if}

  <!-- Status Bar -->
  <div class="mb-4 rounded-xl border border-slate-200 bg-white p-3 text-center shadow-xs">
    <span class="text-sm font-bold {winner ? 'text-emerald-600 animate-pulse' : 'text-slate-700'}">
      {displayStatus}
    </span>
  </div>

  <!-- Caro Board -->
  <div class="flex justify-center overflow-x-auto pb-4">
    <div class="inline-grid grid-cols-15 gap-0 rounded-xl bg-amber-100 p-2 shadow-xl border-2 border-amber-300">
      {#each board as row, r}
        <div class="flex">
          {#each row as cell, c}
            {@const isWinCell = winningCells.some(([wr, wc]) => wr === r && wc === c)}
            <button
              type="button"
              class="relative flex h-7 w-7 sm:h-9 sm:w-9 items-center justify-center border border-amber-300/80 text-sm sm:text-base font-black transition-colors hover:bg-amber-200/50 focus:outline-none
                {isWinCell ? 'bg-emerald-300 ring-2 ring-emerald-500 z-10' : ''}"
              on:click={() => handleCellClick(r, c)}
              aria-label={`Ô ${r + 1}, ${c + 1}`}
            >
              {#if cell === 'X'}
                <span class="text-indigo-600">✕</span>
              {:else if cell === 'O'}
                <span class="text-rose-600">◯</span>
              {/if}
            </button>
          {/each}
        </div>
      {/each}
    </div>
  </div>

  <AdBanner />

  <!-- Rules Section -->
  <section class="mt-8 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
    <h2 class="text-lg font-bold text-slate-900 mb-3">{t.rulesTitle}</h2>
    <p class="text-sm text-slate-600 leading-relaxed mb-4">
      {t.rulesDesc}
    </p>
    <div class="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs text-slate-600">
      <div class="rounded-xl bg-slate-50 p-3 border border-slate-100">
        <h4 class="font-bold text-slate-800 mb-1">{t.step1Title}</h4>
        <p>{t.step1Desc}</p>
      </div>
      <div class="rounded-xl bg-slate-50 p-3 border border-slate-100">
        <h4 class="font-bold text-slate-800 mb-1">{t.step2Title}</h4>
        <p>{t.step2Desc}</p>
      </div>
      <div class="rounded-xl bg-slate-50 p-3 border border-slate-100">
        <h4 class="font-bold text-slate-800 mb-1">{t.step3Title}</h4>
        <p>{t.step3Desc}</p>
      </div>
    </div>
  </section>
</div>
