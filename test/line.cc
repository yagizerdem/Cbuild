#include <gtest/gtest.h>

#include "../src/line.h"

using namespace line;

TEST(lineTest, Basic) {
	std::string program = "a = 10";

	std::vector<Line> lines = splitLines(program);
	ASSERT_EQ(lines.size(), 1);
	ASSERT_EQ(lines.at(0).normalizedText, "a = 10");
}

TEST(lineTest, MultiLine) {
	std::string program = "a = 10 \n"
	"program : main.o app.o \n"
	"\t cmd 1 \n"
	" \n"
	"\t  \n"
	"\t cmd 2 \n"
	;

	std::vector<Line> lines = splitLines(program);
	classifyLines(lines);

	ASSERT_EQ(lines.size(), 4);
	ASSERT_EQ(lines.at(1).normalizedText, "program : main.o app.o");
	ASSERT_EQ(lines.at(1).type, LineType::RuleHeader);

	ASSERT_EQ(lines.at(0).type, LineType::Assignment);

	ASSERT_EQ(lines.at(2).type, LineType::Recipe);
	ASSERT_EQ(lines.at(2).normalizedText, "cmd 1");
	ASSERT_EQ(lines.at(3).type, LineType::Recipe);
	ASSERT_EQ(lines.at(3).normalizedText, "cmd 2");
}

TEST(lineTest, RuleHeaderAssignentSameLine) {
	std::string program = "a = 10 : main.o : program.cpp util.cpp";

	std::vector<Line> lines = splitLines(program);
	classifyLines(lines);

	ASSERT_EQ(lines.size(), 1);
	ASSERT_EQ(lines.at(0).type, LineType::Assignment);

	program = "main.o : a = 10 program.cpp util.cpp";

	lines = splitLines(program);
	classifyLines(lines);

	ASSERT_EQ(lines.size(), 1);
	ASSERT_EQ(lines.at(0).type, LineType::RuleHeader);
}