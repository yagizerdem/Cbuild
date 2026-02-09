//
// Created by pennywise on 2/9/26.
//

#include "line.h"

#include "stringUtil.h"

using namespace  line;

bool isComment(const std::string& line) {
	const auto s = strutil::trim_copy(line);
	return  !s.empty() && s.at(0) == '#';
}

std::vector<Line> line::splitLines(const std::string& program) {
	std::vector<Line> lines;
	int lineNo = 1;

	std::vector<std::string> raw_lines = strutil::split(program, '\n');
	strutil::drop_empty(raw_lines);

	for (const std::string &raw_line : raw_lines) {
		if (isComment(raw_line)) {
			lineNo++;
			continue;
		}
		Line new_line;
		new_line.rawText = raw_line;
		new_line.normalizedText = strutil::trim_copy(raw_line);
		new_line.lineNo = lineNo;
		if (!new_line.normalizedText.empty()) lines.push_back(new_line);
	}

	return lines;
}

LineType classifyLine(const Line &line) {
	if (line.rawText.at(0) == '\t') return Recipe;

	size_t colPos = line.rawText.find(':');
	size_t assignmentPos = line.rawText.find('=');

	if (colPos != std::string::npos && assignmentPos != std::string::npos) {
		return  assignmentPos < colPos ? Assignment : RuleHeader;
	}
	if (colPos != std::string::npos) {
		return  RuleHeader;
	}
	if (assignmentPos != std::string::npos) {
		return  Assignment;
	}
	return RuleHeader;
}

void line::classifyLines(std::vector<Line> &lines) {
	for (Line &line : lines) {
		line.type = classifyLine(line);
	}
}


