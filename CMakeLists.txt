cmake_minimum_required(VERSION 3.4.1)

SET(CMAKE_CXX_FLAGS "${CMAKE_CXX_FLAGS} -std=c++11")

project(MyQueeneroCoreCpp)
#
include_directories("build/boost/include") # must exist already - run bin/build-boost-emscripten.sh
#
include_directories("src")
#
set(MYQUEENERO_CORE_CPP "src/submodules/myqueenero-core-cpp")
set(MYQUEENERO_CORE_CPP_SRC "${MYQUEENERO_CORE_CPP}/src")
include_directories("${MYQUEENERO_CORE_CPP}/src")
#
set(QUEENERO_SRC "${MYQUEENERO_CORE_CPP}/contrib/queenero-core-custom")
include_directories(${QUEENERO_SRC})
include_directories("${QUEENERO_SRC}/epee/include")
include_directories("${QUEENERO_SRC}/common")
include_directories("${QUEENERO_SRC}/vtlogger")
include_directories("${QUEENERO_SRC}/crypto")
include_directories("${QUEENERO_SRC}/cryptonote_basic")
include_directories("${QUEENERO_SRC}/multisig")
include_directories("${QUEENERO_SRC}/cryptonote_core")
include_directories("${QUEENERO_SRC}/cryptonote_protocol")
include_directories("${QUEENERO_SRC}/wallet")
include_directories("${QUEENERO_SRC}/rpc")
include_directories("${QUEENERO_SRC}/mnemonics")
include_directories("${QUEENERO_SRC}/contrib/libsodium/include") # support sodium/… paths
include_directories("${QUEENERO_SRC}/contrib/libsodium/include/sodium")
#
# keeping test files in a separate source directory 
# file(GLOB TEST_SRCS RELATIVE ${CMAKE_CURRENT_SOURCE_DIR} test/test_*.cpp)
#
set(
    SRC_FILES
    #
    src/index.cpp
    src/emscr_async_send_bridge.hpp
    src/emscr_async_send_bridge.cpp
    #
    ${MYQUEENERO_CORE_CPP_SRC}/queenero_address_utils.hpp
    ${MYQUEENERO_CORE_CPP_SRC}/queenero_address_utils.cpp
    ${MYQUEENERO_CORE_CPP_SRC}/queenero_paymentID_utils.hpp
    ${MYQUEENERO_CORE_CPP_SRC}/queenero_paymentID_utils.cpp
    ${MYQUEENERO_CORE_CPP_SRC}/queenero_key_image_utils.hpp
    ${MYQUEENERO_CORE_CPP_SRC}/queenero_key_image_utils.cpp
    ${MYQUEENERO_CORE_CPP_SRC}/queenero_fee_utils.hpp
    ${MYQUEENERO_CORE_CPP_SRC}/queenero_fee_utils.cpp
    ${MYQUEENERO_CORE_CPP_SRC}/queenero_transfer_utils.hpp
    ${MYQUEENERO_CORE_CPP_SRC}/queenero_transfer_utils.cpp
    ${MYQUEENERO_CORE_CPP_SRC}/queenero_fork_rules.hpp
    ${MYQUEENERO_CORE_CPP_SRC}/queenero_fork_rules.cpp
    ${MYQUEENERO_CORE_CPP_SRC}/queenero_wallet_utils.hpp
    ${MYQUEENERO_CORE_CPP_SRC}/queenero_wallet_utils.cpp
    ${MYQUEENERO_CORE_CPP_SRC}/serial_bridge_index.hpp
    ${MYQUEENERO_CORE_CPP_SRC}/serial_bridge_index.cpp
    ${MYQUEENERO_CORE_CPP_SRC}/queenero_send_routine.hpp
    ${MYQUEENERO_CORE_CPP_SRC}/queenero_send_routine.cpp
    ${MYQUEENERO_CORE_CPP_SRC}/serial_bridge_utils.hpp
    ${MYQUEENERO_CORE_CPP_SRC}/serial_bridge_utils.cpp
    ${MYQUEENERO_CORE_CPP_SRC}/tools__ret_vals.hpp
    ${MYQUEENERO_CORE_CPP_SRC}/tools__ret_vals.cpp
    #
    ${QUEENERO_SRC}/cryptonote_basic/cryptonote_basic_impl.cpp
    ${QUEENERO_SRC}/cryptonote_basic/account.cpp
    ${QUEENERO_SRC}/cryptonote_basic/cryptonote_format_utils.cpp
    ${QUEENERO_SRC}/crypto/crypto.cpp
    ${QUEENERO_SRC}/crypto/hash.c
    ${QUEENERO_SRC}/crypto/slow-hash-dummied.cpp
    ${QUEENERO_SRC}/crypto/oaes_lib.c
    ${QUEENERO_SRC}/crypto/crypto-ops.c
    ${QUEENERO_SRC}/crypto/crypto-ops-data.c
    ${QUEENERO_SRC}/crypto/keccak.c
    ${QUEENERO_SRC}/crypto/chacha.c
    ${QUEENERO_SRC}/crypto/random.c
    ${QUEENERO_SRC}/crypto/aesb.c
    ${QUEENERO_SRC}/crypto/tree-hash.c
    ${QUEENERO_SRC}/crypto/hash-extra-blake.c
    ${QUEENERO_SRC}/crypto/blake256.c
    ${QUEENERO_SRC}/crypto/hash-extra-groestl.c
    ${QUEENERO_SRC}/crypto/hash-extra-jh.c
    ${QUEENERO_SRC}/crypto/hash-extra-skein.c
    ${QUEENERO_SRC}/crypto/groestl.c
    ${QUEENERO_SRC}/crypto/jh.c
    ${QUEENERO_SRC}/crypto/skein.c
    ${QUEENERO_SRC}/cryptonote_core/cryptonote_tx_utils.cpp
    ${QUEENERO_SRC}/common/base58.cpp
    ${QUEENERO_SRC}/common/threadpool.cpp
    ${QUEENERO_SRC}/common/aligned.c
    ${QUEENERO_SRC}/common/util.cpp
    ${QUEENERO_SRC}/epee/src/hex.cpp
    ${QUEENERO_SRC}/epee/src/string_tools.cpp
    ${QUEENERO_SRC}/epee/src/memwipe.c
    ${QUEENERO_SRC}/epee/src/mlocker.cpp
    ${QUEENERO_SRC}/epee/src/wipeable_string.cpp
    ${QUEENERO_SRC}/device/device.cpp
    ${QUEENERO_SRC}/device/device_default.cpp
    ${QUEENERO_SRC}/ringct/rctOps.cpp
    ${QUEENERO_SRC}/ringct/rctTypes.cpp
    ${QUEENERO_SRC}/ringct/rctCryptoOps.c
    ${QUEENERO_SRC}/ringct/rctSigs.cpp
    ${QUEENERO_SRC}/ringct/bulletproofs.cc
    ${QUEENERO_SRC}/ringct/multiexp.cc
    ${QUEENERO_SRC}/mnemonics/electrum-words.cpp
    ${QUEENERO_SRC}/vtlogger/logger.cpp
    ${QUEENERO_SRC}/contrib/libsodium/src/crypto_verify/verify.c
)

set(boost_DIR ${CMAKE_SOURCE_DIR}/build/boost)

add_library(boost_chrono STATIC IMPORTED)
set_target_properties(
    boost_chrono PROPERTIES IMPORTED_LOCATION
    ${boost_DIR}/lib/libboost_chrono.a
)
add_library(boost_system STATIC IMPORTED)
set_target_properties(
    boost_system PROPERTIES IMPORTED_LOCATION
    ${boost_DIR}/lib/libboost_system.a
)
#
add_library(boost_thread STATIC IMPORTED)
set_target_properties(
    boost_thread PROPERTIES IMPORTED_LOCATION
    ${boost_DIR}/lib/libboost_thread.a
)
#
#
set (
    EMCC_LINKER_FLAGS___BASE
    #unsure if the -I...boost..include is necessary here due to include above
    #
    # TODO? does EXPORT_NAME need to be the same for both targets? (or should it be set per-target with …_WASM, …_ASMJS?)
    "-Wall -std=c++11 \
--bind -s MODULARIZE=1 \
-s 'EXPORT_NAME=\"MyQueeneroCoreCpp\"' \
--llvm-lto 1 \
-s ERROR_ON_UNDEFINED_SYMBOLS=0 \
-s ASSERTIONS=2 \
-s EXIT_RUNTIME=0 \
-s \"BINARYEN_TRAP_MODE='clamp'\" \
-s PRECISE_F32=1 \
-s DISABLE_EXCEPTION_CATCHING=0 \
-s EXCEPTION_DEBUG=1 \
-s DEMANGLE_SUPPORT=1 \
-s NO_DYNAMIC_EXECUTION=1 \
-s NODEJS_CATCH_EXIT=0 \
-s EXTRA_EXPORTED_RUNTIME_METHODS='[\"UTF8ToString\"]' \
"
    # • Disabling exception catching does not introduce silent failures 
    # • Probably don't need PRECISE_F32 but wouldn't want to not use it
    #
    #
    # -s SAFE_HEAP=1 \
    # -g \
)
set(
    EMCC_LINKER_FLAGS__ASMJS
    "${EMCC_LINKER_FLAGS___BASE} \
-s WASM=0 \
-Os \
--separate-asm \
-s AGGRESSIVE_VARIABLE_ELIMINATION=1 \
-s ALLOW_MEMORY_GROWTH=0 \
--memory-init-file 0 \
-s SEPARATE_ASM_MODULE_NAME=asmjs \
"
    # --memory-init-file is explicitly set to 0 because optimization level is Oz, and some clients like React Native have trouble loading .mem files
    # .... it also didn't seem to have a giant impact on perf. but this should be tested again
    #
    # --closure 1 \
)
set(
    EMCC_LINKER_FLAGS__WASM
    "${EMCC_LINKER_FLAGS___BASE} \
-s WASM=1 \
-Oz \
-s ALLOW_MEMORY_GROWTH=1 \
--post-js ${CMAKE_CURRENT_LIST_DIR}/src/module-post.js \
"
    # -g \
)
#
#    -s EXPORTED_FUNCTIONS='[\"_sc_reduce\", \"_sc_reduce32\", \"_sc_check\", \"_sc_add\", \"_ge_fromfe_frombytes_vartime\", \"_ge_mul8\", \"_ge_p1p1_to_p3\", \"_ge_p3_tobytes\", \"_ge_scalarmult\", \"_ge_tobytes\", \"_sc_sub\", \"_sc_mulsub\", \"_ge_scalarmult_base\", \"_sc_0\", \"_ge_double_scalarmult_base_vartime\", \"_ge_double_scalarmult_precomp_vartime\", \"_ge_frombytes_vartime\", \"_ge_dsm_precomp\"]' \
#
#
message(STATUS "EMCC_LINKER_FLAGS__WASM ${EMCC_LINKER_FLAGS__WASM}")
message(STATUS "EMCC_LINKER_FLAGS__ASMJS ${EMCC_LINKER_FLAGS__ASMJS}")
#
add_executable(MyQueeneroCoreCpp_WASM ${SRC_FILES})
add_executable(MyQueeneroCoreCpp_ASMJS ${SRC_FILES})
#
set_target_properties(MyQueeneroCoreCpp_WASM PROPERTIES LINK_FLAGS "${EMCC_LINKER_FLAGS__WASM}")
set_target_properties(MyQueeneroCoreCpp_ASMJS PROPERTIES LINK_FLAGS "${EMCC_LINKER_FLAGS__ASMJS}")
#
# set_target_properties(MyQueeneroCoreCpp_WASM PROPERTIES SUFFIX ".html")
# set_target_properties(MyQueeneroCoreCpp_ASMJS PROPERTIES SUFFIX ".html")
#
# boost_atomic
# boost_date_time
# boost_filesystem
# boost_locale
# boost_program_options
# boost_regex
# boost_serialization
# boost_signals
# boost_timer
# boost_wserialization
#
target_link_libraries(
    MyQueeneroCoreCpp_WASM
    #
    boost_chrono
    boost_system
    boost_thread
    #
    ${log-lib}
)
target_link_libraries(
    MyQueeneroCoreCpp_ASMJS
    #
    boost_chrono
    boost_system
    boost_thread
    #
    ${log-lib}
)
