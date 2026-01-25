add_executable(Cbuild main.cpp)


file(GLOB_RECURSE util CONFIGURE_DEPENDS ./util/*.cpp ./util/*.h)
file(GLOB_RECURSE parser CONFIGURE_DEPENDS ./parser/*.cpp ./parser/*.h)


#libraries
add_library(utilLib STATIC ${util})


set_target_properties(Cbuild
        utilLib
        PROPERTIES LINKER_LANGUAGE CXX)