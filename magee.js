let lastKey;
let keyBuffer;

let turn = 1;
const maxTurn = 30;
let cash = 2000;
let bank = 0;
let debt = 5000;
let health = 100;
const maxHealth = 100;
let space = 30;
let maxSpace = 30;
let spaceTier = 1;
const spaceTierPrice = [5000, 10000, 15000, 20000, 25000];
const spaceTierSpace = [10, 10, 10, 20, 20];
let product = [];
let heldProduct = [0, 0, 0, 0, 0, 0];
const location = ['Berlin', 'London', 'Miami ', 'Sydney', 'Tokyo ', 'Moscow'];
let city = location[0];
let room = -1;
const isProd = ["", "Product 1", "Product 2", "Product 3", "Product 4", "Product 5", "Product 6"];
let prodSelected = isProd[0];
let prodNum = 0;
let maxBuy;

function getName() { return 'Deal Wars'; }

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
	bankCalcInterest();
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
	drawText("   " + isProd[1] + " - " + heldProduct[0], 12, 3, 11);
	drawText("   " + isProd[2] + " - " + heldProduct[1], 12, 3, 12);
	drawText("   " + isProd[3] + " - " + heldProduct[2], 12, 3, 13);
	drawText("   " + isProd[4] + " - " + heldProduct[3], 12, 3, 14);
	drawText("   " + isProd[5] + " - " + heldProduct[4], 12, 3, 15);
	drawText("   " + isProd[6] + " - " + heldProduct[5], 12, 3, 16);
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
	drawText("   " + isProd[1] + " - " + product[0], 12, 30, 11);
	drawText("   " + isProd[2] + " - " + product[1], 12, 30, 12);
	drawText("   " + isProd[3] + " - " + product[2], 12, 30, 13);
	drawText("   " + isProd[4] + " - " + product[3], 12, 30, 14);
	drawText("   " + isProd[5] + " - " + product[4], 12, 30, 15);
	drawText("   " + isProd[6] + " - " + product[5], 12, 30, 16);
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
	if (turn > 30) { room = 7; }
}

function drawTitle() {
	drawText("████████▄     ▄████████    ▄████████  ▄█    by", 9, 1, 1);
	drawText("███   ▀███   ███    ███   ███    ███ ███  Leigh Magee", 9, 1, 2);
	drawText("███    ███   ███    █▀    ███    ███ ███      2022", 9, 1, 3);
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

function drawBuy() {
	clearScreen();
	maxBuy = (maxBuyFunc(cash, product, prodNum));
	drawText("Pssst, I got the goods, how much you need?", 12, 1, 1);
	drawText("You have " + space + "\/" + maxSpace + " space left.", 12, 1, 2);
	drawText("You have " + cash + " cash on hand.", 12, 1, 3);
	drawText("(1) " + isProd[1] + " - " + product[0], 12, 1, 5);
	drawText("(2) " + isProd[2] + " - " + product[1], 12, 1, 6);
	drawText("(3) " + isProd[3] + " - " + product[2], 12, 1, 7);
	drawText("(4) " + isProd[4] + " - " + product[3], 12, 25, 5);
	drawText("(5) " + isProd[5] + " - " + product[4], 12, 25, 6);
	drawText("(6) " + isProd[6] + " - " + product[5], 12, 25, 7);

	if (prodSelected == isProd[1]) {
		prodNum = 1;
		drawText("You have selected " + isProd[1], 12, 1, 9);
		drawText("Price is " + product[0] + " per unit.", 12, 1, 10);
	}
	if (prodSelected == isProd[2]) {
		prodNum = 2;
		drawText("You have selected " + isProd[2], 12, 1, 9);
		drawText("Price is " + product[1] + " per unit.", 12, 1, 10);
	}
	if (prodSelected == isProd[3]) {
		prodNum = 3;
		drawText("You have selected " + isProd[3], 12, 1, 9);
		drawText("Price is " + product[2] + " per unit.", 12, 1, 10);
	}
	if (prodSelected == isProd[4]) {
		prodNum = 4;
		drawText("You have selected " + isProd[4], 12, 1, 9);
		drawText("Price is " + product[3] + " per unit.", 12, 1, 10);
	}
	if (prodSelected == isProd[5]) {
		prodNum = 5;
		drawText("You have selected " + isProd[5], 12, 1, 9);
		drawText("Price is " + product[4] + " per unit.", 12, 1, 10);
	}
	if (prodSelected == isProd[6]) {
		prodNum = 6;
		drawText("You have selected " + isProd[6], 12, 1, 9);
		drawText("Price is " + product[5] + " per unit.", 12, 1, 10);
		}
	else if (prodSelected == isProd[0]) { drawText("Press a number (1 - 6) to select a product.", 1, 1, 9); }
	if (prodSelected != isProd[0] && (cash > product[(prodNum - 1)])) {
		drawText("                     ", 12, 27, 10);
		drawText("You can afford: " + maxBuy, 12, 27, 10);
	}
	if (prodSelected != isProd[0]) {
		drawText("(A) Buy one", 12, 1, 12);
		drawText("(S) Buy ten", 12, 1, 13);
		if (maxBuy == 0) { drawText("(D) Buy max (0)", 1, 1, 14); }
		else drawText("(D) Buy max (" + maxBuy + ")", 12, 1, 14);
	}
	drawText("Press 'b' to go back", 12, 1, 17);
}

function maxBuyFunc(c, p, n) {
	let mb = Math.floor(c / p[(n - 1)]);
	if (mb >= space) { return space; }
	else
		return mb;
}

function drawSell() {
	clearScreen();
	drawText("Need to unload? I can take anything you got.", 12, 1, 1);
	drawText("You have " + space + "\/" + maxSpace + " space left.", 12, 1, 2);
	drawText("You have " + cash + " cash on hand.", 12, 1, 3);
	drawText("(1) " + isProd[1] + " - " + product[0], 12, 1, 5);
	drawText("(2) " + isProd[2] + " - " + product[1], 12, 1, 6);
	drawText("(3) " + isProd[3] + " - " + product[2], 12, 1, 7);
	drawText("(4) " + isProd[4] + " - " + product[3], 12, 25, 5);
	drawText("(5) " + isProd[5] + " - " + product[4], 12, 25, 6);
	drawText("(6) " + isProd[6] + " - " + product[5], 12, 25, 7);
	if (prodSelected == isProd[1]) {
		prodNum = 1;
		drawText("You have selected " + isProd[1], 12, 1, 9);
		drawText("Price is " + product[0] + " per unit.", 12, 1, 10);
	}
	if (prodSelected == isProd[2]) {
		prodNum = 2;
		drawText("You have selected " + isProd[2], 12, 1, 9);
		drawText("Price is " + product[1] + " per unit.", 12, 1, 10);
	}
	if (prodSelected == isProd[3]) {
		prodNum = 3;
		drawText("You have selected " + isProd[3], 12, 1, 9);
		drawText("Price is " + product[2] + " per unit.", 12, 1, 10);
	}
	if (prodSelected == isProd[4]) {
		prodNum = 4;
		drawText("You have selected " + isProd[4], 12, 1, 9);
		drawText("Price is " + product[3] + " per unit.", 12, 1, 10);
	}
	if (prodSelected == isProd[5]) {
		prodNum = 5;
		drawText("You have selected " + isProd[5], 12, 1, 9);
		drawText("Price is " + product[4] + " per unit.", 12, 1, 10);
	}
	if (prodSelected == isProd[6]) {
		prodNum = 6;
		drawText("You have selected " + isProd[6], 12, 1, 9);
		drawText("Price is " + product[5] + " per unit.", 12, 1, 10);
	}
	else if (prodSelected == isProd[0]) { drawText("Press a number (1 - 6) to select a product.", 1, 1, 9); }
	if (prodSelected != isProd[0] && (heldProduct[(prodNum - 1)] != 0)) { drawText("You have: " + heldProduct[prodNum - 1], 12, 27, 10); }
	else if (prodSelected != isProd[0]) { drawText("You have: 0", 12, 27, 10); }
	if (prodSelected != isProd[0]) {
		drawText("(A) Sell one", 12, 1, 12);
		drawText("(S) Sell ten", 12, 1, 13);
		drawText("(D) Sell max (" + heldProduct[(prodNum - 1)] + ")", 12, 1, 14);
	}
	drawText("Press 'b' to go back", 12, 1, 17);
}

function drawShop() {
	clearScreen();
	drawText("Welcome to Worldwide Shipping Authority.", 12, 1, 1);
	drawText("You currently hold a Class " + spaceTier + " shipping license.", 12, 1, 2);
	if (spaceTier == 6) { drawText("You hold the highest class!", 12, 1, 4); }
	else {
		drawText("Would you like to purchase the next license class?", 12, 1, 4);
		drawText("Class: " + (spaceTier + 1), 12, 1, 5);
		drawText("Price: " + spaceTierPrice[(spaceTier - 1)], 12, 1, 6);
		drawText("Space: +" + spaceTierSpace[(spaceTier - 1)], 12, 1, 7);
		if (cash <= spaceTierPrice[(spaceTier - 1)]) { drawText("Press 'y' to purchase. (CAN'T AFFORD!)", 1, 1, 9);	}
		else drawText("Press 'y' to purchase.", 12, 1, 9);
	}
	drawText("Press 'b' to return.", 12, 1, 10);
}

function drawBank() {
	clearScreen();
	drawText("Welcome to Internation Bank.", 12, 1, 1);
	drawText("Thank you for banking with us!", 12, 1, 2);
	drawText("Customer Account: #2264854\/B29", 12, 1, 3);
	drawText("Please select from these services:", 12, 1, 5);
	drawText("(D) Deposit", 12, 1, 6);
	drawText("(W) Withdrawal", 12, 1, 7);
	drawText("Press 'b' to return.", 12, 1, 9);
}

function drawBankWithdrawl() {
	clearScreen();
	drawText("You have " + cash + " on hand.", 12, 1, 1);
	drawText("Account Balance: " + bank, 12, 1, 2);
	drawText("How much do you wish to withdraw?", 12, 1, 3);
	drawText("Savings accrue 1.5% interest per day.", 12, 1, 4);
	drawText("(A) 1000", 12, 1, 6);
	drawText("(S) 5000", 12, 1, 7);
	drawText("(D) 10000", 12, 1, 8);
	drawText("(F) 30000", 12, 1, 9);
	drawText("Press 'b' to return.", 12, 1, 11);
}

function drawBankDeposit() {
	clearScreen();
	drawText("You have " + cash + " on hand.", 12, 1, 1);
	drawText("Account Balance: " + bank, 12, 1, 2);
	drawText("How much do you wish to deposit?", 12, 1, 3);
	drawText("Savings accrue 1.5% interest per day.", 12, 1, 4)
	drawText("(A) 1000", 12, 1, 6);
	drawText("(S) 5000", 12, 1, 7);
	drawText("(D) 10000", 12, 1, 8);
	drawText("(F) 30000", 12, 1, 9);
	drawText("Press 'b' to return.", 12, 1, 11);
}

function drawLoan() {
	clearScreen();
	drawText("You owe " + debt + " to the loanshark.", 12, 1, 1);
	drawText("How much do you wish to pay back?", 12, 1, 2);
	debtCalc();
	drawText("Press 'b' to return.", 12, 1, 10);
}

function bankCalcInterest() {
	if (bank > 0) {	bank = Math.floor(bank * 1.015); }
}

function debtCalc() {
	if ((cash - 1000) < 0) { drawText("(A) 1000 (CAN'T AFFORD!)", 1, 1, 4); }
	else drawText("(A) 1000", 12, 1, 4);
	if ((cash - 5000) < 0) { drawText("(S) 5000 (CAN'T AFFORD!)", 1, 1, 5); }
	else drawText("(S) 5000", 12, 1, 5);
	if ((cash - 10000) < 0) { drawText("(D) 10000 (CAN'T AFFORD!)", 1, 1, 6); }
	else drawText("(D) 1000", 12, 1, 6);
	if ((cash - 30000) < 0) { drawText("(F) 30000 (CAN'T AFFORD!", 1, 1, 7); }
	else drawText("(F) 30000", 12, 1, 7);
	if ((cash - debt) < 0) { drawText("(G) Everything (CAN'T AFFORD!)", 1, 1, 8); }
	else drawText("(G) Everything (" + debt + ")", 12, 1, 8);
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
		case 97: //a
			if (room == 8 && (cash >= 1000)) {
				cash = (cash - 1000);
				bank = (bank + 1000);
				drawBankDeposit();
			}
			if (room == 9 && (bank >= 1000)) {
				cash = (cash + 1000);
				bank = (bank - 1000);
				drawBankWithdrawl();
			}
			if (room == 5 && (cash >= 1000)) {
				cash = (cash - 1000);
				debt = (debt - 1000);
				drawLoan();
			}
			if (room == 1) {
				if (cash > product[(prodNum - 1)] && (space != 0)) {
					cash = (cash - product[(prodNum - 1)]);
					heldProduct[(prodNum - 1)]++;
					space--;
                }
			}
			if (room == 2) {
				if (heldProduct[(prodNum - 1)] != 0) {
					cash = (cash + product[(prodNum - 1)]);
					heldProduct[(prodNum - 1)]--;
					space++;
                }
            }
			break;
		case 98: //b
			if (room != 0) {
				prodSelected = 0;
				prodNum = 0;
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
			if (room == 1) {
				if (cash > (product[(prodNum - 1)] * maxBuy) && (space = maxBuy) && (space != 0)) {
					space = space - maxBuy;
					heldProduct[(prodNum - 1)] = heldProduct[(prodNum - 1)] + maxBuy;
					cash = cash - (product[(prodNum - 1)] * maxBuy);
				}
			}
			if (room == 2) {
				if (heldProduct[(prodNum - 1)] != 0) {
					cash = cash + (product[(prodNum - 1)] * heldProduct[(prodNum - 1)]);
					space = space + heldProduct[(prodNum - 1)];
					heldProduct[(prodNum - 1)] = 0;
                }
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
			cash = 2000;
			debt = 5000;
			heldProduct = [0, 0, 0, 0, 0, 0];
			clearScreen();
			room = -1;
			onConnect();
			break;
		case 115: //s
			if (room == 0) {
				room = 3;
			}
			if (room == 1) {
				if (cash > (product[(prodNum - 1)] * 10) && (space >= 10)) {
					cash = (cash - (product[(prodNum - 1)] * 10));
					heldProduct[(prodNum - 1)] = (heldProduct[(prodNum - 1)] + 10);
					space = (space - 10);
				}
			}
			if (room == 2) {
				if (heldProduct[(prodNum - 1)] != 0 && heldProduct[(prodNum - 1)] >= 10) {
					cash = (cash + (product[prodNum - 1] * 10));
					heldProduct[(prodNum - 1)] = (heldProduct[(prodNum - 1)] - 10);
					space = (space + 10);
                }
            }
			break;
		case 119: //w
			if (room == 4) {
				room = 9;
			}
			break;
		case 120: //x
			if (room == 0) {
				room = 2;
            }
			break;
		case 122: //z
			if (room == 0) {
				room = 1;
            }
			break;
		case 49: //1
			if (room == 0) {
				if (city != location[0]) {
					city = location[0];
					turn++;
					setPrices();
				}
			}
			if (room == 1 || room == 2) {
				prodSelected = isProd[1];
            }
			break;
		case 50: //2
			if (room == 0) {
				if (city != location[1]) {
					city = location[1];
					turn++;
					setPrices();
				}
			}
			if (room == 1 || room == 2) {
				prodSelected = isProd[2];
			}
			break;
		case 51: //3
			if (room == 0) {
				if (city != location[2]) {
					city = location[2];
					turn++;
					setPrices();
				}
			}
			if (room == 1 || room == 2) {
				prodSelected = isProd[3];
			}
			break;
		case 52: //4
			if (room == 0) {
				if (city != location[3]) {
					city = location[3];
					turn++;
					setPrices();
				}
			}
			if (room == 1 || room == 2) {
				prodSelected = isProd[4];
			}
			break;
		case 53: //5
			if (room == 0) {
				if (city != location[4]) {
					city = location[4];
					turn++;
					setPrices();
				}
			}
			if (room == 1 || room == 2) {
				prodSelected = isProd[5];
			}
			break;
		case 54: //6
			if (room == 0) {
				if (city != location[5]) {
					city = location[5];
					turn++;
					setPrices();
				}
			}
			if (room == 1 || room == 2) {
				prodSelected = isProd[6];
			}
			break;
    }
}