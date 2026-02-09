//
// Created by pennywise on 2/9/26.
//

#ifndef CBUILD_VARIABLE_H
#define CBUILD_VARIABLE_H
#include <cstddef>
#include <string>

namespace variable {

	struct CollectVariableResult {
		std::size_t consumed;
		std::string raw; // with $(identifier)
		std::string normalized; // identifier
	};

	CollectVariableResult collectVariable(std::string input, size_t& current);

}

#endif //CBUILD_VARIABLE_H