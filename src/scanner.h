//
// Created by pennywise on 2/9/26.
//

#ifndef CBUILD_SCANNER_H
#define CBUILD_SCANNER_H
#include <vector>

#include "line.h"
using namespace line;

namespace scanner {
	void scanLines(const std::vector<Line>& lines);
}

#endif //CBUILD_SCANNER_H