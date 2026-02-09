file(GLOB_RECURSE SOURCES CONFIGURE_DEPENDS
        ${CMAKE_CURRENT_SOURCE_DIR}/*.cpp
        ${CMAKE_CURRENT_SOURCE_DIR}/*.h
)

#remove main.cpp
list(REMOVE_ITEM SOURCES
        ${CMAKE_CURRENT_SOURCE_DIR}/main.cpp
)


add_library(core STATIC ${SOURCES})

add_executable(Cbuild
        main.cpp
        scanner.h
        env.h
        scanner.cpp
        CbuildError.h
)

target_link_libraries(Cbuild PUBLIC core)

add_subdirectory(backward)
target_link_libraries(Cbuild PUBLIC Backward::Interface)


set_target_properties(Cbuild PROPERTIES LINKER_LANGUAGE CXX)