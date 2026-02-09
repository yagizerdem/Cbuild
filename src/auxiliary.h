//
// Created by pennywise on 2/9/26.
//

#ifndef CBUILD_AUXILARY_H
#define CBUILD_AUXILARY_H
#include <string>

#ifndef END
#define END '\0'

namespace auxiliary {
	inline bool isEscaped(const std::string& text, const size_t charIndex, const char escapeCharacter) {
		int i = (int)charIndex -1;
		int counter = 0;
		while (i >= 0 && text[i] == escapeCharacter) {
			i--;
			counter++;
		}
		return  counter % 2 == 1;
	}

	inline bool isEscapedBackslash(const std::string& text, const size_t charIndex) {
		return isEscaped(text, charIndex, '\\');
	}

	inline bool isDollarBackslash(const std::string& text, const size_t charIndex) {
		return isEscaped(text, charIndex, '$');
	}

	// some cursor helper functions
	inline char peek(const std::string& text, const size_t& current) {
		if (current >= text.length() ) {
			return END;
		}
		return text[current];
	}

	inline char peekNext(const std::string& text, const size_t& current) {
		if (current + 1 >= text.length() ) {
			return END;
		}
		return text[current + 1];
	}

	inline char advance(const std::string& text, size_t& current) {
		if (current >= text.length() ) {
			return END;
		}
		char c = text[current];
		current++;
		return  c;
	}

	inline char match(const std::string& text, size_t& current, const char expected) {
		if (peek(text, current) == expected) {
			advance(text, current);
			return true;
		}
		return false;
	}
}

#endif //CBUILD_AUXILARY_H