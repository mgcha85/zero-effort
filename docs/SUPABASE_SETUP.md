# Supabase 및 외부 연동 설정 가이드

본 프로젝트는 클라이언트 사이드 연산을 기본으로 하므로 초기 구동 시 데이터베이스가 필수적이지는 않습니다.  
랭킹, 대국 기록 보관, 통계 집계를 추가하고자 할 경우 Supabase의 무료 티어를 활용할 수 있습니다.

---

## 1. Supabase 프로젝트 생성
1. [Supabase](https://supabase.com)에 로그인 후 **New Project** 생성.
2. 프로젝트 대시보드의 **Project Settings -> API**로 이동.
3. 다음 두 값을 복사하여 `.env.dev` 및 `.env.prod`에 기입:
   - `Project URL` -> `SUPABASE_URL`
   - `anon public key` -> `SUPABASE_ANON_KEY`

---

## 2. 테이블 생성 (SQL Editor)
Supabase 대시보드의 **SQL Editor**에서 아래 쿼리를 실행합니다:

```sql
-- 1. 게임 기록 테이블
create table public.game_records (
    id uuid default gen_random_uuid() primary key,
    game_type text not null,       -- 'caro' | 'xiangqi'
    winner text not null,          -- 'X' | 'O' | 'AI'
    total_moves int not null,
    created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 2. RLS(Row Level Security) 설정 (익명 유저도 쓰기/읽기 허용)
alter table public.game_records enable row level security;

create policy "Enable insert for all users" on public.game_records
for insert with check (true);

create policy "Enable select for all users" on public.game_records
for select using (true);
```

---

## 3. Google AdSense 설정
1. [Google AdSense](https://adsense.google.com)에서 사이트 등록.
2. 승인 후 발급받은 게시자 ID(`ca-pub-xxxxxxxxxxxxxxxx`)를 `.env.dev` 및 `.env.prod`의 `PUBLIC_ADSENSE_CLIENT_ID`에 입력.
3. 배너 슬롯 ID를 발급받아 컴포넌트 호출 시 `<AdBanner slot="xxxxxx" />`로 전달.
