add_executable(backend_tests
  test_tasks.cpp
  ${CMAKE_SOURCE_DIR}/vendor/catch_amalgamated.cpp
)
target_include_directories(backend_tests PRIVATE ${CMAKE_SOURCE_DIR}/vendor)
target_link_libraries(backend_tests PRIVATE backend_lib)

include(CTest)
add_test(NAME backend_tests COMMAND backend_tests)
