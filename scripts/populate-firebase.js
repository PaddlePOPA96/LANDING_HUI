// Script to populate Firebase with sample data
// Run with: node scripts/populate-firebase.js

const { initializeApp } = require('firebase/app');
const { getFirestore, doc, setDoc } = require('firebase/firestore');

const firebaseConfig = {
    apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
    authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
    projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
    storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

async function populateData() {
    try {
        console.log('🔥 Populating Firebase with sample data...\n');

        // Valorant Settings
        const valorantData = {
            sens: '0.35',
            dpi: '800',
            crosshair: '0;s;1;P;c;5;h;0;m;1;0l;4;0o;2;0a;1;0f;0;1b;0;S;c;4;o;1'
        };

        await setDoc(doc(db, 'settings', 'valorant'), valorantData);
        console.log('✅ Valorant settings added:');
        console.log('   - Sensitivity:', valorantData.sens);
        console.log('   - DPI:', valorantData.dpi);
        console.log('   - Crosshair:', valorantData.crosshair.substring(0, 30) + '...\n');

        // Gear Data
        const gearData = {
            mouse: 'Logitech G Pro X Superlight',
            mouseLink: 'https://www.tokopedia.com/search?q=logitech%20g%20pro%20x%20superlight',
            mouseImage: 'https://resource.logitechg.com/w_692,c_lpad,ar_4:3,q_auto,f_auto,dpr_1.0/d_transparent.gif/content/dam/gaming/en/products/pro-x-superlight/gallery/pro-x-superlight-gallery-1-black.png?v=1',

            keyboard: 'Wooting 60HE',
            keyboardLink: 'https://www.tokopedia.com/search?q=wooting%2060he',
            keyboardImage: 'https://wooting.io/cdn/shop/files/wooting-60he-arm-edition-keyboard-wooting-1.jpg?v=1705930989&width=1445',

            headset: 'HyperX Cloud Alpha',
            headsetLink: 'https://www.tokopedia.com/search?q=hyperx%20cloud%20alpha',
            headsetImage: 'https://row.hyperx.com/cdn/shop/files/hyperx_cloud_alpha_wireless_1_main_900x.jpg?v=1694608439',

            monitor: 'ASUS ROG Swift PG259QN',
            monitorLink: 'https://www.tokopedia.com/search?q=asus%20rog%20swift%20pg259qn',
            monitorImage: 'https://dlcdnwebimgs.asus.com/gain/7C6F3F8C-3D0C-4EE5-8B3F-8E3F3F3F3F3F/w717/h525',

            mousepad: 'Artisan Hien Soft XL',
            mousepadLink: 'https://www.tokopedia.com/search?q=artisan%20hien',
            mousepadImage: 'https://m.media-amazon.com/images/I/71qvQ7QHBIL._AC_SL1500_.jpg'
        };

        await setDoc(doc(db, 'settings', 'gear'), gearData);
        console.log('✅ Gear data added:');
        console.log('   - Mouse:', gearData.mouse);
        console.log('   - Keyboard:', gearData.keyboard);
        console.log('   - Headset:', gearData.headset);
        console.log('   - Monitor:', gearData.monitor);
        console.log('   - Mousepad:', gearData.mousepad);
        console.log('\n🎉 All data successfully added to Firebase!');
        console.log('📍 Check your dashboard at http://localhost:3000/dashboard');

        process.exit(0);
    } catch (error) {
        console.error('❌ Error populating data:', error);
        process.exit(1);
    }
}

populateData();
