# Browser Pet 🐱

A cute animated browser pet that lives in the corner of your screen and reacts to your browsing behavior!
<img width="398" height="523" alt="Image" src="https://github.com/user-attachments/assets/b87fb749-d6af-4e25-8ea8-eb80189ac1c3" />

<img width="268" height="308" alt="Image" src="https://github.com/user-attachments/assets/9b6c483a-7ba9-4cc7-9993-8f0f8e5ecab2" />
<img width="225" height="310" alt="Image" src="https://github.com/user-attachments/assets/bf82789f-4245-4d97-82f1-083c2b882b8e" />
<img width="253" height="314" alt="Image" src="https://github.com/user-attachments/assets/3d05737f-e8a1-448b-bb6c-12749ef63846" />

## 🎯 Features

- **🐱 Animated Pet**: Displays a cute pet in the bottom-right corner of every webpage
- **😊 Mood System**: Pet changes emotions based on what you're browsing
  - 😤 **Angry** - When you're procrastinating (YouTube, social media, etc.)
  - 😬 **Worried** - Getting a bit distracted
  - 🚀 **Excited** - Being super productive (GitHub, Stack Overflow, etc.)
  - 😊 **Happy** - Normal productive browsing
  - 😌 **Neutral** - Just chilling
- **💬 Dynamic Messages**: Pet gives you encouraging or snarky comments
- **📊 Statistics Tracking**: View your productivity vs procrastination stats in the popup
- **🎨 Custom Animations**: Shakes when angry, bounces when worried, jumps when excited
- **🖼️ Custom Images**: Use your own GIFs or PNGs for each mood

## 📁 File Structure
```
browser-pet/
├── manifest.json          # Extension configuration
├── background.js          # Background service worker (tracks browsing)
├── content.js             # Injected into webpages
├── popup.html             # Extension popup interface
├── popup.js               # Popup logic
├── popup.css              # Popup styling
├── pet.html               # Pet display HTML
├── pet.js                 # Pet behavior logic
├── pet.css                # Pet styling
├── icons/                 # Extension icons
│   ├── icon16.png
│   ├── icon48.png
│   └── icon128.png
└── images/                # Pet mood images
    ├── neutral.gif
    ├── happy.gif
    ├── excited.gif
    ├── worried.gif
    └── angry.gif
```

## 🚀 Installation

### Step 1: Download the Files
1. Clone or download this repository
2. Make sure all files are in a folder called `browser-pet`


### Step 4: Load in Chrome
1. Open Chrome and navigate to `chrome://extensions/`
2. Enable **Developer mode** (toggle in top-right corner)
3. Click **Load unpacked**
4. Select your `browser-pet` folder
5. Done! 🎉

## 🎮 Usage

### Automatic Tracking
Once installed, your pet will automatically appear on every webpage you visit and react to your browsing:

**Productive Sites** (Pet gets excited 🚀):
- GitHub, Stack Overflow
- Documentation sites
- Learning platforms (Coursera, Udemy, LinkedIn Learning)
- Tutorial sites

**Procrastination Sites** (Pet gets angry 😤):
- YouTube, Netflix, Twitch
- Social media (Facebook, Instagram, Twitter, Reddit, TikTok)

**Neutral Sites** (Pet stays calm 😌):
- Everything else

### View Statistics
Click the extension icon in your toolbar to see:
- 📚 Productivity score
- 😅 Procrastination score
- Visual progress bars
- Reset button for fresh start

### Customization

#### Add More Sites
Edit `background.js` and `pet.js` to add sites to the tracking lists:
```javascript
const productiveSites = ['github.com', 'stackoverflow.com', 'yoursite.com'];
const procrastinationSites = ['youtube.com', 'facebook.com', 'yoursite.com'];
```

## 🛠️ Technical Details

### Technologies Used
- **Manifest V3** - Latest Chrome extension format
- **Service Workers** - Background tracking
- **Chrome Storage API** - Persistent data storage
- **Chrome Tabs API** - URL monitoring
- **Chrome Alarms API** - Daily reset functionality

### How It Works
1. **Background Worker** (`background.js`) monitors active tabs and tracks time spent on different site categories
2. **Content Script** (`content.js`) injects the pet iframe into every webpage
3. **Pet Display** (`pet.html/js/css`) shows the animated pet and handles mood changes
4. **Popup** (`popup.html/js/css`) displays statistics and controls

### Performance
- Lightweight: ~500KB total (excluding your custom images)
- Minimal CPU usage
- Only tracks active tab (not background tabs)
- Updates scores every minute
- Daily automatic reset

## 🐛 Troubleshooting

### Pet not appearing?
- Check that all files are in the correct folder structure
- Make sure Developer mode is enabled in Chrome
- Try removing and re-adding the extension
- Check browser console for errors (F12)

### Images not loading?
- Verify image files exist in `images/` folder
- Check that filenames match exactly (case-sensitive)
- Ensure images are in GIF or PNG format
- Check file extensions in `pet.js` match your actual files

### Stats not tracking?
- Make sure you granted all permissions when installing
- Check that `alarms` permission is in manifest.json
- Try resetting stats from the popup

### White background showing?
- Clear browser cache and reload the extension
- Make sure `pet.css` has `background: transparent !important;`



## 🤝 Contributing

Want to improve the Browser Pet? Contributions are welcome!

Ideas for improvements:
- [ ] More mood variations
- [ ] Customizable pet selection (dog, rabbit, etc.)
- [ ] Sound effects
- [ ] Weekly/monthly statistics
- [ ] Export statistics
- [ ] Custom site categories
- [ ] Draggable pet position
- [ ] Sleep mode (hide pet temporarily)

## 🎨 Credits

Created with ❤️ for productivity and fun!

---

**Enjoy your new browser companion! 🐱✨**
