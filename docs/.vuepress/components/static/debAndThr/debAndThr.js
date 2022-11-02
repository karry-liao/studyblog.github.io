

//节流函数
export function throttle(fn, delay=2000) { 
    let timer = null;
    return function (...arg) { 
        if (!timer) { 
            timer = setTimeout(() => {
                fn.apply(this, arg);
                timer = null;
            }, delay);
        }
    }
}

export function debounce(func, delay = 2000){
	// 缓存一个定时器
	let timer = 0
	// 这里返回的函数是每次用户实际调用的防抖函数 
	return function() {
		// 如果已经设定过定时器了就清空上一次的定时器
		if (timer) clearTimeout(timer)
		// 开始一个新的定时器，延迟执行用户传入的方法
		timer = setTimeout(() => {
			func.apply(this, arguments)
		}, delay)
	}
}