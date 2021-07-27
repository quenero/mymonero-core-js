"use strict";
const myqueenero = require("../");
const assert = require('assert')
// const assert = require("assert");

var public_key =
	"904e49462268d771cc1649084c35aa1296bfb214880fe2e7f373620a3e2ba597";
var private_key =
	"52aa4c69b93b780885c9d7f51e6fd5795904962c61a2e07437e130784846f70d";

var nettype = myqueenero.nettype_utils.network_type.MAINNET;

var queenero_utils;

async function t1()
{
	try {
		var decoded = (await myqueenero.queenero_utils_promise).decode_address(
			"49qwWM9y7j1fvaBK684Y5sMbN8MZ3XwDLcSaqcKwjh5W9kn9qFigPBNBwzdq6TCAm2gKxQWrdZuEZQBMjQodi9cNRHuCbTr",
			nettype,
		);
		console.log("decoded", decoded)
	} catch (e) {
		console.log(e)
	}

	try {
		var created = (await myqueenero.queenero_utils_promise).newly_created_wallet(
			"ja",
			nettype,
		);
		console.log("newly_created_wallet", created)
		//
		try {
			var unpacked = (await myqueenero.queenero_utils_promise).seed_and_keys_from_mnemonic(
				created.mnemonic_string,
				nettype,
			);
			console.log("seed_and_keys_from_mnemonic", created)
		} catch (e) {
			console.log(e)
		}
	} catch (e) {
		console.log(e)
	}

	try {
		var fee = new myqueenero.JSBigInt((await myqueenero.queenero_utils_promise).estimated_tx_network_fee(
			"0", 1, "24658", 10
			// fee_per_kb__string, priority, fee_per_b__string, optl__fork_version
		));
		console.log("estimated_tx_network_fee", myqueenero.queenero_amount_format_utils.formatMoneyFull(fee), "QMR")
	} catch (e) {
		console.log(e)
	}

	try {
		const blockchain_height = 4
		const tx = 
		{
			unlock_time: blockchain_height + 5,
		}
		const reason = myqueenero.queenero_txParsing_utils.TransactionLockedReason(tx, blockchain_height)
		console.log("reason" , reason)
		assert.equal(0, reason.indexOf("Will be unlocked in 5 blocks, ~5 minutes, Today at"))
	} catch (e) {
		console.log(e)
	}


	try {
		const blockchain_height = myqueenero.queenero_config.maxBlockNumber
		const tx = 
		{
			unlock_time: blockchain_height * 10000,
		}
		const reason = myqueenero.queenero_txParsing_utils.TransactionLockedReason(tx, blockchain_height)
		console.log("reason" , reason)
		assert.equal(0, reason.indexOf("Will be unlocked in"))
		assert.notEqual(-1, reason.indexOf("years"))
	} catch (e) {
		console.log(e)
	}

}
t1()
