#if defined(_WIN32)
#if defined(_MSC_VER)
	#define USE_BACKWARD 1
#else
	#define USE_BACKWARD 0
#endif
#else
#define USE_BACKWARD 1
#endif

#if USE_BACKWARD
#include "backward/backward.hpp"
static backward::SignalHandling g_signal_handler;
#endif


#include "stringUtil.h"

int main() {

	return 0;
}
