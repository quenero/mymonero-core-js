// Copyright (c) 2014-2019, MyMonero.com
//
// All rights reserved.
//
// Redistribution and use in source and binary forms, with or without modification, are
// permitted provided that the following conditions are met:
//
// 1. Redistributions of source code must retain the above copyright notice, this list of
//	conditions and the following disclaimer.
//
// 2. Redistributions in binary form must reproduce the above copyright notice, this list
//	of conditions and the following disclaimer in the documentation and/or other
//	materials provided with the distribution.
//
// 3. Neither the name of the copyright holder nor the names of its contributors may be
//	used to endorse or promote products derived from this software without specific
//	prior written permission.
//
// THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND ANY
// EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF
// MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL
// THE COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL,
// SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO,
// PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS
// INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT,
// STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF
// THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.

"use strict";
const myqueenero = require("../");
const queenero_config = require('../queenero_utils/queenero_config') 
const assert = require('assert')

describe("sendingFunds tests", function()
{
	it("can tell locked reason -- in 5 blocks", function()
	{
		const blockchain_height = 1231231
		const tx = 
		{
			unlock_time: blockchain_height + 5,
		}
		const reason = myqueenero.queenero_txParsing_utils.TransactionLockedReason(tx, blockchain_height)
		assert.equal(0, reason.indexOf("Will be unlocked in 5 blocks, ~5 minutes, Today at"))
	});
	it("can tell locked reason -- timestamp", function()
	{
		const blockchain_height = myqueenero.queenero_config.maxBlockNumber
		const tx = 
		{
			unlock_time: blockchain_height * 10000,
		}
		const reason = myqueenero.queenero_txParsing_utils.TransactionLockedReason(tx, blockchain_height)
		assert.equal(0, reason.indexOf("Will be unlocked in"))
		assert.notEqual(-1, reason.indexOf("years"))
	});
});


