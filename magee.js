let lastKey;
let keyBuffer;

let turn = 1;
let maxTurn = 30;
let cash = 2000;
let bank = 0;
let debt = 5000;
let health = 100;
let maxHealth = 100;
let space = 30;
let maxSpace = 30;
let product = [];
let heldProduct = [0,0,0,0,0,0];

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
	bankCalc();
	product[0] = rndPrice(10, 60);
	product[1] = rndPrice(70, 250);
	product[2] = rndPrice(300, 900);
	product[3] = rndPrice(1000, 4500);
	product[4] = rndPrice(5000, 14000);
	product[5] = rndPrice(15000, 30000);
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
	drawText("Health: " + health + '\/' + maxHealth, 12, 18, 3);
	drawText("  Cash: " + cash, 12, 18, 4);
	drawText("  Bank: " + bank, 12, 18, 5);
	drawText("  Debt: " + debt, 12, 18, 6);
}

function drawInventory()
{
	drawBox(12, 2, 8, 25, 12);
	drawText("INVENTORY", 12, 10, 9);
	drawText("   Product 1 - " + heldProduct[0], 12, 3, 11);
	drawText("   Product 2 - " + heldProduct[1], 12, 3, 12);
	drawText("   Product 3 - " + heldProduct[2], 12, 3, 13);
	drawText("   Product 4 - " + heldProduct[3], 12, 3, 14);
	drawText("   Product 5 - " + heldProduct[4], 12, 3, 15);
	drawText("   Product 6 - " + heldProduct[5], 12, 3, 16);
	drawText("Space: " + space + "\/" + maxSpace, 12, 8, 18);
}

function drawSales()
{
	drawBox(12, 29, 8, 25, 12);
	drawText("DEALER OFFERS", 12, 35, 9);
	drawText("     ", 12, 42, 11);
	drawText("     ", 12, 42, 12);
	drawText("     ", 12, 42, 13);
	drawText("     ", 12, 42, 14);
	drawText("     ", 12, 42, 15);
	drawText("     ", 12, 42, 16);
	drawText("   Product 1 - " + product[0], 12, 30, 11);
	drawText("   Product 2 - " + product[1], 12, 30, 12);
	drawText("   Product 3 - " + product[2], 12, 30, 13);
	drawText("   Product 4 - " + product[3], 12, 30, 14);
	drawText("   Product 5 - " + product[4], 12, 30, 15);
	drawText("   Product 6 - " + product[5], 12, 30, 16);
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
		case 8:
			drawBankDeposit();
			break;
		case 9:
			drawBankWithdrawl();
	}
	if (turn > 30) {
		room = 7;
    }
}

function drawTitle() {
	drawText("████████▄     ▄████████    ▄████████  ▄█      ", 9, 1, 1);
	drawText("███   ▀███   ███    ███   ███    ███ ███      ", 9, 1, 2);
	drawText("███    ███   ███    █▀    ███    ███ ███      ", 9, 1, 3);
	drawText("███    ███  ▄███▄▄▄       ███    ███ ███      ", 9, 1, 4);
	drawText("███    ███ ▀▀███▀▀▀     ▀███████████ ███      ", 9, 1, 5);
	drawText("███    ███   ███    █▄    ███    ███ ███      ", 9, 1, 6);
	drawText("███   ▄███   ███    ███   ███    ███ ███▌    ▄", 9, 1, 7);
	drawText("████████▀    ██████████   ███    █▀  █████▄▄██", 9, 1, 8);
	drawText("                                     ▀        ", 9, 1, 9);
	drawText("     ▄█     █▄     ▄████████    ▄████████    ▄████████ ", 9, 1, 10);
	drawText("    ███     ███   ███    ███   ███    ███   ███    ███ ", 9, 1, 11);
	drawText("    ███     ███   ███    ███   ███    ███   ███    █▀  ", 9, 1, 12);
	drawText("    ███     ███   ███    ███  ▄███▄▄▄▄██▀   ███        ", 9, 1, 13);
	drawText("    ███     ███ ▀███████████ ▀▀███▀▀▀▀▀   ▀███████████ ", 9, 1, 14);
	drawText("    ███     ███   ███    ███ ▀███████████          ███ ", 9, 1, 15);
	drawText("    ███ ▄█▄ ███   ███    ███   ███    ███    ▄█    ███ ", 9, 1, 16);
	drawText("     ▀███▀███▀    ███    █▀    ███    ███  ▄████████▀  ", 9, 1, 17);
	drawText("                               ███    ███              ", 9, 1, 18);
	drawText("      Press 'p' to play", 17, 1, 19);
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

function drawBank() {
	clearScreen();
	drawText("Welcome to Internation Bank.", 12, 1, 1);
	drawText("Thank you for banking with us!", 12, 1, 2);
	drawText("Customer Account: #2264854\/B29", 12, 1, 3);
	drawText("Please select from these services:", 12, 1, 5);
	drawText("(D) Deposit", 12, 1, 6);
	drawText("(W) Withdrawal", 12, 1, 7);
	drawText("Press 'b' to go back.", 12, 1, 9);
}

function drawBankWithdrawl() {

}

function drawBankDeposit() {
	clearScreen();
	drawText("You have " + cash + " on hand.", 12, 1, 1);
	drawText("How much do you wish to deposit?", 12, 1, 2);
	drawText("Savings accrue 1.5% interest per day.", 12, 1, 3)
	drawText("(A) 1000", 12, 1, 5);
	drawText("(S) 5000", 12, 1, 6);
	drawText("(D) 10000", 12, 1, 7);
	drawText("(F) 30000", 12, 1, 8);
	drawText("Press 'b' to return.", 12, 1, 10);
}

function drawLoan() {
	clearScreen();
	drawText("You owe " + debt + " to the loanshark.", 12, 1, 1);
	drawText("How much do you wish to pay back?", 12, 1, 2);
	drawText("(A) 1000", 12, 1, 4);
	drawText("(S) 5000", 12, 1, 5);
	drawText("(D) 10000", 12, 1, 6);
	drawText("(F) 30000", 12, 1, 7);
	debtCalc();
	drawText("Press 'b' to return.", 12, 1, 10);
}

function bankCalc() {
	if (bank > 0) {
		bank = Math.floor(bank * 1.015);
    }
}

function debtCalc() {
	if ((cash - 1000) < 0) {
		drawText("(A) 1000 (CAN'T AFFORD!)", 1, 1, 4);
	}
	else 
		drawText("(A) 1000", 12, 1, 4);
	if ((cash - 5000) < 0) {
		drawText("(S) 5000 (CAN'T AFFORD!)", 1, 1, 5);
	}
	else
		drawText("(S) 5000", 12, 1, 5);
	if ((cash - 10000) < 0) {
		drawText("(D) 10000 (CAN'T AFFORD!)", 1, 1, 6);
	}
	else
		drawText("(D) 1000", 12, 1, 6);
	if ((cash - 30000) < 0) {
		drawText("(F) 30000 (CAN'T AFFORD!", 1, 1, 7);
	}
	else
		drawText("(F) 30000", 12, 1, 7);
	if ((cash - debt) < 0) {
		drawText("(G) Everything (CAN'T AFFORD!)", 1, 1, 8);
	}
	else
		drawText("(G) Everything (" + debt + ")", 12, 1, 8);
}
function drawClinic() { }

function drawEnd() {
	clearScreen();
	if (debt != 0) { endLoss(); }
	else endWin();
}

function endWin() { }

function endLoss() {
	drawText("You failed to pay back all your debt!", 12, 1, 1);
	drawText("The Loanshark kills you and takes all your money!", 12, 1, 2);
	drawText("YOUR SCORE: 0", 12, 1, 3);
	drawText("A score of 0 is not eligible for a high score entry!", 12, 1, 4)
	drawText("Press 'r' to restart.", 12, 1, 6);
}

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
		case 97:
			if (room = 8) {
				cash = (cash - 1000);
				bank = (bank + 1000);
			}
			break;
		case 98: //b
			if (room != 0) {
				room = 0;
			}
			else if (room == 0) {
				room = 4;
            }
			break;
		case 100: //d
			if (room == 4) {
				room = 8;
			}
			break;
		case 108: //l
			room = 5;
			break;
		case 112: //p
			if (room == -1) {
				room++;
				onUpdate();
			}
			break;
		case 114: //r
			turn = 1;
			debt = 5000;
			heldProduct = [0, 0, 0, 0, 0, 0];
			clearScreen();
			room = -1;
			onConnect();
			break;
		case 119: //w
			if (room == 4) {
				room = 9;
			}
			break;
		case 49: //1
			if (city != location[0]) {
				city = location[0];
				turn++;
				setPrices();
			}
			break;
		case 50: //2
			if (city != location[1]) {
				city = location[1];
				turn++;
				setPrices();
			}
			break;
		case 51: //3
			if (city != location[2]) {
				city = location[2];
				turn++;
				setPrices();
			}
			break;
		case 52: //4
			if (city != location[3]) {
				city = location[3];
				turn++;
				setPrices();
			}
			break;
		case 53: //5
			if (city != location[4]) {
				city = location[4];
				turn++;
				setPrices();
			}
			break;
		case 54: //6
			if (city != location[5]) {
				city = location[5];
				turn++;
				setPrices();
			}
			break;
    }
}