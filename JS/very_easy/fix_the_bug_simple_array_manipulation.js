/*
Problem: Fix the Bug: Simple Array Manipulation
Difficulty: very easy
Link: https://edabit.com/challenge/jipHTDkabftop5irE
Date: 2025-05-06
*/

function incrementItems(arr) {
	for (let i = 0; i < arr.length; i++)
		arr[i] = arr[i] + 1;
	return arr
}