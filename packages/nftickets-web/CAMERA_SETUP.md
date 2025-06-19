# 📱 Camera Setup Guide for NFTickets QR Scanner

## Why Camera Permissions Aren't Showing

Modern browsers require **HTTPS** or **localhost** for camera access. Here are the solutions:

## 🚀 Quick Solutions

### Option 1: Use Localhost (Easiest)
```bash
npm run dev
```
Then access:
- **Desktop**: `http://localhost:5173/test-qr` (shows QR code)
- **Mobile**: `http://localhost:5173/scanner` (scans QR codes)

### Option 2: Use Your Computer's IP Address
1. Find your computer's IP address:
   ```bash
   # On Mac/Linux
   ifconfig | grep "inet " | grep -v 127.0.0.1
   
   # On Windows
   ipconfig | findstr "IPv4"
   ```

2. Access from mobile using your IP:
   - Example: `http://192.168.1.100:5173/scanner`

### Option 3: Use HTTPS (Most Reliable)
For production-like testing, set up HTTPS:

1. Install mkcert:
   ```bash
   # Mac
   brew install mkcert
   
   # Windows (with Chocolatey)
   choco install mkcert
   ```

2. Create certificates:
   ```bash
   mkcert -install
   mkcert localhost 127.0.0.1 ::1
   ```

3. Update `vite.config.ts`:
   ```typescript
   server: {
     https: {
       key: fs.readFileSync('localhost-key.pem'),
       cert: fs.readFileSync('localhost.pem'),
     },
     host: '0.0.0.0',
     port: 5173
   }
   ```

## 📱 Testing Workflow

1. **Start Development Server**:
   ```bash
   npm run dev
   ```

2. **On Desktop**: Go to `http://localhost:5173/test-qr`
   - Shows a test QR code on screen

3. **On Mobile**: Go to `http://localhost:5173/scanner`
   - Enter any wallet address as "Scanner Wallet"
   - Tap "Start Scanning"
   - Grant camera permissions when prompted
   - Point camera at the QR code on desktop

## 🔧 Troubleshooting

### Camera Permission Denied
- Make sure you're using `localhost` or HTTPS
- Clear browser cache and reload
- Check browser settings for camera permissions
- Try a different browser (Chrome/Safari work best)

### "Camera not supported"
- Ensure you're on a mobile device with a camera
- Try using the device's native browser
- Check if other camera apps work on the device

### QR Code Not Scanning
- Ensure good lighting
- Hold camera steady
- Make sure QR code fills most of the camera view
- Try adjusting distance from the screen

## 🌐 Browser Compatibility

**✅ Supported:**
- Chrome (mobile/desktop)
- Safari (mobile/desktop)
- Firefox (mobile/desktop)
- Edge (mobile/desktop)

**❌ Limited Support:**
- Older browsers
- Browsers in private/incognito mode (sometimes)

## 📋 Test Data

The test QR code contains:
```json
{
  "tokenId": "1",
  "contractAddress": "0x1234...",
  "eventId": "550e8400-e29b-41d4-a716-446655440000",
  "eventName": "Test Concert",
  "sectorName": "VIP",
  "sectorId": 0,
  "ticketOwner": "0x9876...",
  "timestamp": 1703123456789,
  "signature": "0xabcdef..."
}
```

**Expected Result**: Verification will fail (this is normal - it's test data not signed by your server). 