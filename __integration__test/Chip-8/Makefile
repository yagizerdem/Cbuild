# .DEFAULT_GOAL := all

# .PHONY: all build clean run

SRC_DIR := ./src
DIST_DIR := ./dist
TARGET := main
CFLAGS := -Isrc/include

C_SRC := $(wildcard $(SRC_DIR)/*.c $(SRC_DIR)/**/*.c)
OBJECTS := $(patsubst %.c,%.o,$(notdir $(C_SRC)))

all: build run

build: $(TARGET) clean

run:
	@$(DIST_DIR)/$(TARGET)

$(TARGET): $(OBJECTS)
	mkdir -p $(DIST_DIR)
	gcc -o $(DIST_DIR)/$@ $^ $(CFLAGS)

$(OBJECTS): $(C_SRC)
	gcc -c $^ $(CFLAGS)

clean:
	rm $(OBJECTS)