# Zero-Effort Apps 데이터 및 API 규격서

## 1. 개요
대다수의 앱 로직은 완전한 클라이언트 단에서 수행되므로 별도의 REST API 통신 없이 동작합니다. 외부 연동 및 데이터 교환 규격은 아래와 같습니다.

---

## 2. P2P 시그널링 규격 (`apps/caro-game`)
P2P 실시간 1:1 대국을 위한 WebRTC SDP 및 ICE Candidate 교환 프로토콜.

### 방 생성 (Room Creation)
- URL 해시 또는 쿼리 스트링 기반 룸 ID 생성:
  - 형식: `https://domain.com/caro/?room=ROOM_UUID`

### 메시지 페이로드 (WebRTC DataChannel)
```json
{
  "type": "MOVE",
  "player": "X",
  "row": 7,
  "col": 7,
  "timestamp": 1730000000
}
```
```json
{
  "type": "SURRENDER",
  "player": "O"
}
```

---

## 3. 치수 변환 규격 (`apps/size-converter`)
URL 쿼리 파라미터 규격 (공유 및 programmatic SEO용):
- `?cat=[shoes|clothes]&std=[KR|US|EU|UK|VN]&val=[number]&gender=[men|women]`
- 예시: `https://domain.com/size-converter/?cat=shoes&std=KR&val=265&gender=men`

---

## 4. Supabase 연동 스키마 (선택 사항 - 리더보드/통계)
### `game_records` 테이블
```sql
create table public.game_records (
    id uuid default gen_random_uuid() primary key,
    game_type text not null, -- 'caro' | 'xiangqi'
    winner text not null,    -- 'X' | 'O' | 'AI'
    total_moves int not null,
    created_at timestamp with time zone default timezone('utc'::text, now()) not null
);
```
