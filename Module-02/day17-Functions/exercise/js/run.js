const { makeReceiptMaker } = require("./order");
const receipt = makeReceiptMaker();

// Almaz orders Doro Wat (220), Tibs (180), and Shiro (120)
console.log(receipt(220, 180, 120));

// Dawit orders Firfir (140) and Buna (60)
console.log(receipt(140, 60));


// Abebe ordered Coca (80), Doro (220), Kitfo (200), Tibs (180), Sprite (80), Ambo (100), 
console.log(receipt(80, 220, 200, 180, 80, 100, ))