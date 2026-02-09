//
// Created by pennywise on 2/9/26.
//


import  "variable.h";

#include <stdexcept>

variable::CollectVariableResult collectVariable(const std::string& input, size_t& current) {
	variable::CollectVariableResult result;
	int start = current;

	if (input.empty() ||  input.at(0) != '$') {
		throw std::logic_error("[Programmatic error] collect variable should start with $ sign");
	}



	return result;
}
