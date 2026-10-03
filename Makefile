pair = $(1):$(2)

format = $(1)[$(foreach item,x y,$(call pair,$(1),$(item)))]$(item)

item = parent
1 = global

result := $(foreach item,a b,$(call format,$(item)))

all:
	@echo '$(result)'