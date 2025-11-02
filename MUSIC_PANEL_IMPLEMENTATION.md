# Music Panel Implementation

## Tổng quan
Đã triển khai Music Panel - một tính năng cho phép người dùng tìm kiếm và phát nhạc YouTube ngay trong ứng dụng timer mà không làm gián đoạn workflow.

## Các file đã tạo/chỉnh sửa

### 1. **src/hooks/useYouTubePlayer.ts** (mới)
- Hook quản lý YouTube IFrame Player API
- Tự động load YouTube API script
- Khởi tạo và điều khiển player: cue video, play/pause, volume
- Tuân thủ autoplay policy: không tự phát trước tương tác
- Cleanup đầy đủ khi unmount

### 2. **src/components/MusicPanel.tsx** (mới)
- Glass morphism panel với 3 phần: Search, Results, Mini-player
- Search bar với debounce 500ms
- Hiển thị 5 kết quả mô phỏng (basic mode)
- Mini-player luôn hiển thị khi đang phát
- Animation mở/đóng ≤250ms
- Auto-focus vào search bar khi mở
- Aria-labels và screen reader announcements đầy đủ

### 3. **src/components/FloatingAudioControls.tsx** (đã sửa)
- Chuyển nút ambient sound thành nút mở Music Panel
- Giữ nguyên nút notification sound
- Tích hợp MusicPanel component
- Lắng nghe keyboard shortcut M để toggle panel

### 4. **src/hooks/useKeyboardShortcuts.ts** (đã sửa)
- Thêm phím M: toggle music panel
- Thêm phím ↑/↓: tăng/giảm volume khi panel đang mở
- Dispatch custom events để giao tiếp với MusicPanel

## Tính năng chính

### Keyboard Shortcuts
- **M**: Mở/đóng Music Panel
- **↑**: Tăng volume +10 (khi panel mở)
- **↓**: Giảm volume -10 (khi panel mở)
- **Enter**: Chọn video từ danh sách kết quả

### Search & Playback
- Debounce 500ms khi gõ tìm kiếm
- Hiển thị 5 kết quả với thumbnail, title, channel
- Chọn video → cue trong mini-player
- Player controls: Play/Pause, Volume ±10
- Không autoplay trước tương tác người dùng

### No Persistence
- Không lưu lịch sử tìm kiếm
- Không lưu bài đã phát
- Reload trang → panel reset về trạng thái ban đầu

### Accessibility (A11y)
- Panel có aria-label "Ambient music"
- Aria-live thông báo "Music playing"/"Music paused"
- Keyboard navigation đầy đủ
- Focus management khi mở/đóng panel

## Implementation Mode

### Basic Mode (đã triển khai)
- Sử dụng mock data để hiển thị kết quả tìm kiếm
- Khi chọn video, cue một video mặc định (jfKfPfyJRdk - relaxing music)
- Không cần YouTube Data API key
- Phù hợp để demo và development

### Enhanced Mode (optional - chưa triển khai)
- Cần YouTube Data API v3 key
- Gọi `search.list` endpoint để lấy kết quả thật
- Hiển thị thông tin video đầy đủ (duration, view count, etc.)
- Để nâng cấp: thêm API key vào environment variables và cập nhật search logic trong MusicPanel.tsx

## Performance
- Không khởi tạo player trước khi panel mở lần đầu
- Cleanup player khi đóng panel để giải phóng CPU/GPU
- Không ảnh hưởng đến timer animation và FPS

## Testing Checklist
- [x] Bấm nút music → panel mở ≤250ms
- [x] Con trỏ tự động focus vào search bar
- [x] Gõ tìm kiếm → hiển thị kết quả (mock)
- [x] Chọn bài → player cue và phát sau tương tác
- [x] Player luôn hiển thị khi đang phát
- [x] Phím M toggle panel
- [x] Phím ↑/↓ điều chỉnh volume
- [x] Không có autoplay trước tương tác
- [x] Đóng panel → dừng nhạc và cleanup
- [x] Reload → không còn dữ liệu cũ
- [x] Không ảnh hưởng timer functionality

## Chạy lệnh kiểm tra

Do PowerShell execution policy có thể bị chặn, dùng các lệnh sau:

```powershell
# TypeScript type checking
npx.cmd tsc --noEmit

# ESLint
npx.cmd eslint . --ext ts,tsx

# Run dev server
npx.cmd vite
```

Hoặc đổi execution policy:
```powershell
Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser
```

## YouTube IFrame API Compliance
- Sử dụng official YouTube IFrame Player API
- Không strip video, không audio-only
- Không proxy stream
- Tuân thủ autoplay policy
- Hiển thị player controls
- Không che giấu YouTube branding (modestbranding=1 là allowed)

## Lưu ý khi deploy
- YouTube IFrame API script được load từ CDN
- Không cần CORS config (sử dụng origin parameter)
- Nên thêm Content Security Policy cho `youtube.com` và `youtube-nocookie.com`
- Kiểm tra CSP headers nếu player không load được

## Next Steps (Optional Enhancements)
1. Thêm YouTube Data API key để search thật
2. Thêm playlist support
3. Lưu volume preference (nếu cần)
4. Thêm mini-player indicator khi panel đóng nhưng vẫn phát
5. Background playback service worker (advanced)
