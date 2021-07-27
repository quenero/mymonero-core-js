#!/bin/sh

bin/build-emcpp.sh &&
cp build/MyQueeneroCoreCpp_WASM.js queenero_utils/; 
cp build/MyQueeneroCoreCpp_WASM.wasm queenero_utils/;
cp build/MyQueeneroCoreCpp_ASMJS.js queenero_utils/; 
cp build/MyQueeneroCoreCpp_ASMJS.asm.js queenero_utils/ 