
file(GLOB_RECURSE SOURCES CONFIGURE_DEPENDS
        ${CMAKE_CURRENT_SOURCE_DIR}/*.cpp
        ${CMAKE_CURRENT_SOURCE_DIR}/*.h
)

add_executable(Cbuild
        ${SOURCES}
)
add_subdirectory(backward)
target_link_libraries(Cbuild PUBLIC Backward::Interface)


set_target_properties(Cbuild PROPERTIES LINKER_LANGUAGE CXX)