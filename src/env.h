//
// Created by pennywise on 2/9/26.
//

#ifndef CBUILD_ENV_H
#define CBUILD_ENV_H
#include <mutex>
#include <string>
#include <unordered_map>

class Env {

private:
	static Env* instancePtr;

	// Mutex to ensure thread safety
	static std::mutex mtx;

	// Private Constructor
	Env() {}

public:
	Env(const Env& obj) = delete;

	// Static method to get the Singleton instance
	static Env* getInstance() {
		if (instancePtr == nullptr) {
			std::lock_guard<std::mutex> lock(mtx);
			if (instancePtr == nullptr) {
				instancePtr = new Env();
			}
		}
		return instancePtr;
	}

	std::unordered_map<std::string, std::string> symbol_table;
};

Env* Env::instancePtr = nullptr;
std::mutex Env::mtx;


#endif //CBUILD_ENV_H