//
// Created by pennywise on 2/9/26.
//

#include "scanner.h"

#include <iostream>
#include <ostream>

#include "CbuildError.h"
#include "stringUtil.h"

void scanner::scanLines(std::vector<Line>& lines) {
	for (Line& line : lines) {
		switch (line.type) {
			case Assignment:
				scanAssignment(line);
				break;
			case RuleHeader:
				scanRuleHeader(line);
				break;
			case Recipe:
				scanRecipe(line);
				break;
			default:
				break;
		}
	}
}


void scanner::scanAssignment(Line &line) {
	checkColon(line);
	noTargets(line);
}

void scanner::scanRuleHeader(Line &line) {

}

void scanner::scanRecipe(Line &line) {

}

void scanner::checkColon(const Line& line) {
	const long& count = std::ranges::count(line.rawText, ':');

	if (count == 0) {
		throw CbuildError("Makefile:" + std::to_string(line.lineNo) +
			": ***" + "missing separator.  Stop.",
			SYNTAX,
			MISSING_SEPERATOR);
	}

	if (count > 1) {
		throw CbuildError("Makefile:" + std::to_string(line.lineNo) +
			": ***" + "missing target pattern.  Stop.",
			SYNTAX,
			MISSING_TARGET_PATTERN);
	}
}

void scanner::noTargets(const Line& line) {
	const std::vector<std::string> parts = strutil::split(line.rawText, ':');
	std::string first = parts[0];
	strutil::trim(first);
	if (first.empty()) {
		throw CbuildError("Makefile:" + std::to_string(line.lineNo) +
			": ***" + "No targets.  Stop.",
			SYNTAX,
			NO_TARGETS);
	}
}

