let lastKey;
let keyBuffer;

let turn = 1;
let maxTurn = 30;
let cash = 2000;
let bank = 0;
let debt = 5000;
let health = 100;
let pockets = 0;
let maxPockets = 30;

let location = ['Berlin', 'London', 'Miami ', 'Sydney', 'Tokyo ', 'Moscow'];
let city = location[0];

let room = -1;

function getName()
{
	return 'Magee';
}

function onConnect()
{
	lastKey = '';
	keyBuffer = loadData();
	clearScreen();
	setPrices();
}

function setPrices()
{
	doDebt();
	product1 = rndPrice(10, 60);
	product2 = rndPrice(70, 250);
	product3 = rndPrice(300, 900);
	product4 = rndPrice(1000, 4500);
	product5 = rndPrice(5000, 14000);
	product6 = rndPrice(15000, 30000);
}

function drawTravel()
{
	drawText('(1) Berlin', 12, 3, 1);
	drawText('(2) London', 12, 3, 2);
	drawText('(3)  Miami', 12, 3, 3);
	drawText('(4) Sydney', 12, 3, 4);
	drawText('(5)  Tokyo', 12, 3, 5);
	drawText('(6) Moscow', 12, 3, 6);
	drawBox(12, 2, 0, 13, 8);
}

function drawMenu()
{
	drawBox(12, 41, 0, 13, 8);
	drawText("MENU", 12, 45, 1);
	drawText("(S) Shop", 12, 42, 3);
	drawText("(B) Bank", 12, 42, 4);
	drawText("(L) Loan", 12, 42, 5);
	drawText("(C) Clinic", 12, 42, 6);
}

function drawStatus()
{
	drawBox(12, 16, 0, 24, 8);
	drawText(city, 12, 18, 1)
	drawText('Day: ' + turn + '\/' + maxTurn, 12, 29, 1);
	drawText("Health: " + health, 12, 18, 3);
	drawText("  Cash: " + cash, 12, 18, 4);
	drawText("  Bank: " + bank, 12, 18, 5);
	drawText("  Debt: " + debt, 12, 18, 6);
}

function drawInventory()
{
	drawBox(12, 2, 8, 25, 12);
	drawText("INVENTORY", 12, 9, 9);
}

function drawSales()
{
	drawBox(12, 29, 8, 25, 12);
	drawText("DEALER OFFERS", 12, 34, 9);
	drawText("     ", 12, 42, 11);
	drawText("     ", 12, 42, 12);
	drawText("     ", 12, 42, 13);
	drawText("     ", 12, 42, 14);
	drawText("     ", 12, 42, 15);
	drawText("     ", 12, 42, 16);
	drawText("   Product 1 - " + product1, 12, 30, 11);
	drawText("   Product 2 - " + product2, 12, 30, 12);
	drawText("   Product 3 - " + product3, 12, 30, 13);
	drawText("   Product 4 - " + product4, 12, 30, 14);
	drawText("   Product 5 - " + product5, 12, 30, 15);
	drawText("   Product 6 - " + product6, 12, 30, 16);
	drawText("  (Z) Buy    (X) Sell", 12, 30, 18);
}

function onUpdate()
{
	switch (room) {
		case -1:
			drawTitle();
			break;
		case 0:
			drawMain();
			break;
		case 1:
			drawBuy();
			break;
		case 2:
			drawSell();
			break;
		case 3:
			drawShop();
			break;
		case 4:
			drawBank();
			break;
		case 5:
			drawLoan();
			break;
		case 6:
			drawClinic();
			break;
		case 7:
			drawEnd();
			break;
	}
}

function drawTitle() {
	drawText("████████▄     ▄████████    ▄████████  ▄█      ", 12, 1, 1);
	drawText("███   ▀███   ███    ███   ███    ███ ███      ", 12, 1, 2);
	drawText("███    ███   ███    █▀    ███    ███ ███      ", 12, 1, 3);
	drawText("███    ███  ▄███▄▄▄       ███    ███ ███      ", 12, 1, 4);
	drawText("███    ███ ▀▀███▀▀▀     ▀███████████ ███      ", 12, 1, 5);
	drawText("███    ███   ███    █▄    ███    ███ ███      ", 12, 1, 6);
	drawText("███   ▄███   ███    ███   ███    ███ ███▌    ▄", 12, 1, 7);
	drawText("████████▀    ██████████   ███    █▀  █████▄▄██", 12, 1, 8);
	drawText("                                     ▀        ", 12, 1, 9);
	drawText("     ▄█     █▄     ▄████████    ▄████████    ▄████████ ", 12, 1, 10);
	drawText("    ███     ███   ███    ███   ███    ███   ███    ███ ", 12, 1, 11);
	drawText("    ███     ███   ███    ███   ███    ███   ███    █▀  ", 12, 1, 12);
	drawText("    ███     ███   ███    ███  ▄███▄▄▄▄██▀   ███        ", 12, 1, 13);
	drawText("    ███     ███ ▀███████████ ▀▀███▀▀▀▀▀   ▀███████████ ", 12, 1, 14);
	drawText("    ███     ███   ███    ███ ▀███████████          ███ ", 12, 1, 15);
	drawText("    ███ ▄█▄ ███   ███    ███   ███    ███    ▄█    ███ ", 12, 1, 16);
	drawText("     ▀███▀███▀    ███    █▀    ███    ███  ▄████████▀  ", 12, 1, 17);
	drawText("                               ███    ███              ", 12, 1, 18);

}

function drawMain()
{
	clearScreen();
	drawTravel();
	drawMenu();
	drawStatus();
	drawInventory();
	drawSales();
}

function drawBuy() { }

function drawSell() { }

function drawShop() { }

function drawBank() { }

function drawLoan() { }

function drawClinic() { }

function drawEnd() { }

function rndPrice(min, max)
{
	return Math.floor(Math.random() * (max - min + 1)) + min;
}

function doDebt() {
	if (debt == 0) {
		return;
	}
	else
		debt = (Math.floor(debt * 1.1));
}

function onInput(key)
{
	switch (key) {
		case 112:
			if (room == -1) {
				room++;
				onUpdate();
			}
			break;
		case 49:
			if (city != location[0]) {
				city = location[0];
				turn++;
				setPrices();
			}
			break;
		case 50:
			if (city != location[1]) {
				city = location[1];
				turn++;
				setPrices();
			}
			break;
		case 51:
			if (city != location[2]) {
				city = location[2];
				turn++;
				setPrices();
			}
			break;
		case 52:
			if (city != location[3]) {
				city = location[3];
				turn++;
				setPrices();
			}
			break;
		case 53:
			if (city != location[4]) {
				city = location[4];
				turn++;
				setPrices();
			}
			break;
		case 54:
			if (city != location[5]) {
				city = location[5];
				turn++;
				setPrices();
			}
			break;
    }
}