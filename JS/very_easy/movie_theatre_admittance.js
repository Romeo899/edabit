/*
Problem: Movie Theatre Admittance
Difficulty: very easy
Link: https://edabit.com/challenge/fP7gFvDaBymoZrXFx
Date: 2025-05-06
*/

function acceptIntoMovie(age, isSupervised) {
	if (age >= 15 && isSupervised == true || age >= 15 || isSupervised == true) {
		return true
	} else {
		return false
	}
}

