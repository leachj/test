cmake_minimum_required(VERSION 3.16)
project(task_manager_backend CXX)

set(CMAKE_CXX_STANDARD 17)
set(CMAKE_CXX_STANDARD_REQUIRED ON)

if(NOT CMAKE_BUILD_TYPE)
  set(CMAKE_BUILD_TYPE Release)
endif()

find_package(Threads REQUIRED)

add_library(backend_lib INTERFACE)
target_include_directories(backend_lib INTERFACE
  ${CMAKE_SOURCE_DIR}/include
  ${CMAKE_SOURCE_DIR}/vendor
)
target_link_libraries(backend_lib INTERFACE Threads::Threads)
target_compile_options(backend_lib INTERFACE -Wall -Wextra)

add_executable(backend src/main.cpp)
target_link_libraries(backend PRIVATE backend_lib)

enable_testing()
add_subdirectory(tests)
