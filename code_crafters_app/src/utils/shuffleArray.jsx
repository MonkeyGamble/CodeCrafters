export function shuffle(array) {
	let currentIndex = array.length,
		tempElem,
		randomIndex;

	while (0 !== currentIndex) {
		randomIndex = Math.floor(Math.random() * currentIndex);
		currentIndex -= 1;

		tempElem = array[currentIndex];
		array[currentIndex] = array[randomIndex];
		array[randomIndex] = tempElem;
	}
	return array;
}
