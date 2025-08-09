// https://contest.yandex.ru/contest/23638/run-report/140848410/
function merge_sort(collection, left, right) {
	// “ヽ(´▽｀)ノ”
	if (right - left <= 1) {
		return;
	}

	const mid = Math.floor((left + right) / 2);

	merge_sort(collection, left, mid);
	merge_sort(collection, mid, right);
	let sorted = merge(collection, left, mid, right)

	sorted.forEach((num, index) => {
		collection[left + index] = num;
	})
}

function merge(collection, left, mid, right) {
	const leftCollection = collection.slice(left, mid);
	const rightCollection = collection.slice(mid, right);
	const result = [];

	let leftIndex = 0;
	let rightIndex = 0;

	while (leftIndex < leftCollection.length && rightIndex < rightCollection.length) {
		if (leftCollection[leftIndex] < rightCollection[rightIndex]) {
			result.push(leftCollection[leftIndex]);
			leftIndex += 1
		} else {
			result.push(rightCollection[rightIndex]);
			rightIndex += 1
		}
	}

	while (leftIndex < leftCollection.length) {
		result.push(leftCollection[leftIndex]);
		leftIndex += 1;
	}

	while (rightIndex < rightCollection.length) {
		result.push(rightCollection[rightIndex]);
		rightIndex += 1;
	}

	return result;
}


function test() {
	var a = [1, 4, 9, 2, 10, 11];
	var b = merge(a, 0, 3, 6);
	var expected = [1, 2, 4, 9, 10, 11];

	var c = [1, 4, 2, 10, 1, 2];
	merge_sort(c, 0, 6)
	expected = [1, 1, 2, 2, 4, 10];
}
//
// var d = [-6, -12, -14, 14];
// console.log(`==> ${ d }`)
// merge_sort(d, 0, 4)
// console.log(`=== ${ d }`)
