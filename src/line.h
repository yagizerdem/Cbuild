//
// Created by pennywise on 2/9/26.
//

#ifndef CBUILD_LINE_H
#define CBUILD_LINE_H
#include <string>
#include <vector>


namespace line {

	enum  LineType {
		Recipe,
		RuleHeader,
		Assignment
	};

	struct Line {
		std::string rawText;
		std::string normalizedText;
		std::string expandedText;
		LineType type;
		int lineNo;
	};

	std::vector<Line> splitLines(const std::string& program);

	void classifyLines(std::vector<Line> &lines);
}


#endif //CBUILD_LINE_H