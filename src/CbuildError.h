//
// Created by pennywise on 2/9/26.
//

#ifndef CBUILD_CBUILDERROR_H
#define CBUILD_CBUILDERROR_H
#include <algorithm>
#include <exception>
#include <string>

enum ErrorType {
	SYNTAX,
	SEMANTIC,
	PROCESS,
};

enum MachineCode {
	MISSING_SEPERATOR,
	MISSING_TARGET_PATTERN,
	NO_TARGETS,
};

class CbuildError : public std::exception {
public:
	explicit CbuildError(std::string msg,
		ErrorType errorType,
		MachineCode machineCode)
		: message(std::move(msg)) {
		this->errorType = errorType;
		this->machineCode = machineCode;
	}

	explicit CbuildError(std::string msg)
	: message(std::move(msg)) {}

	const char* what() const noexcept override {
		return message.c_str();
	}
	ErrorType errorType;
	MachineCode machineCode;
protected:
	std::string message;
};


#endif //CBUILD_CBUILDERROR_H