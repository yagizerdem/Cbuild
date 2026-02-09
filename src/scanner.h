//
// Created by pennywise on 2/9/26.
//

#ifndef CBUILD_SCANNER_H
#define CBUILD_SCANNER_H
#include <vector>

#include "line.h"
using namespace line;

namespace scanner {
	void scanLines(std::vector<Line>& lines);

	void scanAssignment(Line& line);
	void scanRuleHeader(Line& line);
	void scanRecipe(Line& line);

	void checkColon(const Line& line);
	void noTargets(const Line& line);

}

#endif //CBUILD_SCANNER_H