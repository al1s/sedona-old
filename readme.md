What did I learn?

1. If I want to make image responsive the way background is, I have to use:
	* `width:  100%;`
	* `height: 100%;`
	* `object-fit: cover;`
It wouldn't work for IE 8-11 and Edge, so there is polyfill with JS exists: remove `img` tag with `object-fit` and add `background-image`. Examples [here](https://css-tricks.com/crop-top/).
2. Encountered weird behavior of one of the `row` class - despite it's flexbox, the content don't want to fill it full and there is empty space behind the last of three columns.
3. I stopped thinking on implementation as soon as I've got an obstacle - how to make spacing between different text elements, how to make the html mobile friendly and how it should look on large desktop and on tablet. Many questions and lack of confidence, that I know the answers.
4. Stuck with blue text block - how to make text inside centered? 
