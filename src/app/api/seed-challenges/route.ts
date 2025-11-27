import { NextResponse } from "next/server";
import { drizzle_db } from "@/lib/db";
import { challenges } from "@/lib/schema";

const challengesData = [
    // EASY CHALLENGES (8 total, 1 pro)
    {
        id: 'sum-two-numbers',
        title: 'Sum of Two Numbers',
        description: 'Write a function that takes two numbers and returns their sum.',
        difficulty: 'Easy',
        language: 'python',
        starterCode: `def sum_two_numbers(a, b):
    # Write your code here
    pass`,
        solutionCode: `def sum_two_numbers(a, b):
    return a + b`,
        testCode: `
print(sum_two_numbers(3, 5))
print(sum_two_numbers(10, 20))
print(sum_two_numbers(-1, 1))
`,
        expectedOutput: `8
30
0`,
        proOnly: false
    },
    {
        id: 'is-palindrome',
        title: 'Is Palindrome',
        description: 'Write a function that checks if a string is a palindrome (reads the same forwards and backwards). Return True or False.',
        difficulty: 'Easy',
        language: 'python',
        starterCode: `def is_palindrome(s):
    # Write your code here
    pass`,
        solutionCode: `def is_palindrome(s):
    return s == s[::-1]`,
        testCode: `
print(is_palindrome("racecar"))
print(is_palindrome("hello"))
print(is_palindrome("madam"))
`,
        expectedOutput: `True
False
True`,
        proOnly: false
    },
    {
        id: 'find-max',
        title: 'Find Maximum',
        description: 'Write a function that finds the maximum number in a list.',
        difficulty: 'Easy',
        language: 'python',
        starterCode: `def find_max(numbers):
    # Write your code here
    pass`,
        solutionCode: `def find_max(numbers):
    return max(numbers)`,
        testCode: `
print(find_max([1, 5, 3, 9, 2]))
print(find_max([10, 20, 5]))
print(find_max([-1, -5, -3]))
`,
        expectedOutput: `9
20
-1`,
        proOnly: false
    },
    {
        id: 'count-vowels',
        title: 'Count Vowels',
        description: 'Write a function that counts the number of vowels (a, e, i, o, u) in a string.',
        difficulty: 'Easy',
        language: 'javascript',
        starterCode: `function countVowels(str) {
    // Write your code here
}`,
        solutionCode: `function countVowels(str) {
    return str.toLowerCase().match(/[aeiou]/g)?.length || 0;
}`,
        testCode: `
console.log(countVowels("hello"));
console.log(countVowels("programming"));
console.log(countVowels("xyz"));
`,
        expectedOutput: `2
3
0`,
        proOnly: false
    },
    {
        id: 'is-even',
        title: 'Is Even Number',
        description: 'Write a function that checks if a number is even. Return True or False.',
        difficulty: 'Easy',
        language: 'python',
        starterCode: `def is_even(n):
    # Write your code here
    pass`,
        solutionCode: `def is_even(n):
    return n % 2 == 0`,
        testCode: `
print(is_even(4))
print(is_even(7))
print(is_even(0))
`,
        expectedOutput: `True
False
True`,
        proOnly: false
    },
    {
        id: 'string-length',
        title: 'String Length',
        description: 'Write a function that returns the length of a string without using the built-in length function.',
        difficulty: 'Easy',
        language: 'javascript',
        starterCode: `function stringLength(str) {
    // Write your code here
}`,
        solutionCode: `function stringLength(str) {
    let count = 0;
    for (let char of str) {
        count++;
    }
    return count;
}`,
        testCode: `
console.log(stringLength("hello"));
console.log(stringLength(""));
console.log(stringLength("CodeWithMe"));
`,
        expectedOutput: `5
0
10`,
        proOnly: false
    },
    {
        id: 'celsius-to-fahrenheit',
        title: 'Celsius to Fahrenheit',
        description: 'Write a function that converts Celsius to Fahrenheit. Formula: F = C * 9/5 + 32',
        difficulty: 'Easy',
        language: 'python',
        starterCode: `def celsius_to_fahrenheit(celsius):
    # Write your code here
    pass`,
        solutionCode: `def celsius_to_fahrenheit(celsius):
    return celsius * 9/5 + 32`,
        testCode: `
print(celsius_to_fahrenheit(0))
print(celsius_to_fahrenheit(100))
print(celsius_to_fahrenheit(25))
`,
        expectedOutput: `32.0
212.0
77.0`,
        proOnly: false
    },
    {
        id: 'array-sum-pro',
        title: 'Array Sum (Advanced)',
        description: 'Write a function that sums all numbers in a nested array structure.',
        difficulty: 'Easy',
        language: 'javascript',
        starterCode: `function arraySum(arr) {
    // Write your code here
}`,
        solutionCode: `function arraySum(arr) {
    return arr.flat(Infinity).reduce((sum, num) => sum + num, 0);
}`,
        testCode: `
console.log(arraySum([1, [2, 3], [4, [5]]]));
console.log(arraySum([10, 20, 30]));
console.log(arraySum([[1], [2], [3]]));
`,
        expectedOutput: `15
60
6`,
        proOnly: true
    },

    // MEDIUM CHALLENGES (8 total, 2 pro)
    {
        id: 'reverse-string',
        title: 'Reverse String',
        description: 'Write a function that reverses a given string.',
        difficulty: 'Medium',
        language: 'javascript',
        starterCode: `function reverseString(str) {
    // Write your code here
}`,
        solutionCode: `function reverseString(str) {
    return str.split('').reverse().join('');
}`,
        testCode: `
console.log(reverseString("hello"));
console.log(reverseString("world"));
console.log(reverseString("CodeWithMe"));
`,
        expectedOutput: `olleh
dlrow
eMhtiWedoC`,
        proOnly: false
    },
    {
        id: 'factorial',
        title: 'Factorial',
        description: 'Write a function that returns the factorial of a number. (n!)',
        difficulty: 'Medium',
        language: 'python',
        starterCode: `def factorial(n):
    # Write your code here
    pass`,
        solutionCode: `def factorial(n):
    if n == 0: return 1
    return n * factorial(n-1)`,
        testCode: `
print(factorial(5))
print(factorial(0))
print(factorial(3))
`,
        expectedOutput: `120
1
6`,
        proOnly: false
    },
    {
        id: 'remove-duplicates',
        title: 'Remove Duplicates',
        description: 'Write a function that removes duplicate elements from an array and returns a new array.',
        difficulty: 'Medium',
        language: 'javascript',
        starterCode: `function removeDuplicates(arr) {
    // Write your code here
}`,
        solutionCode: `function removeDuplicates(arr) {
    return [...new Set(arr)];
}`,
        testCode: `
console.log(removeDuplicates([1, 2, 2, 3, 4, 4, 5]).join(','));
console.log(removeDuplicates([1, 1, 1]).join(','));
console.log(removeDuplicates([1, 2, 3]).join(','));
`,
        expectedOutput: `1,2,3,4,5
1
1,2,3`,
        proOnly: false
    },
    {
        id: 'fizzbuzz',
        title: 'FizzBuzz',
        description: 'Write a function that prints numbers from 1 to n. For multiples of 3 print "Fizz", for multiples of 5 print "Buzz", and for multiples of both print "FizzBuzz".',
        difficulty: 'Medium',
        language: 'python',
        starterCode: `def fizzbuzz(n):
    # Write your code here
    pass`,
        solutionCode: `def fizzbuzz(n):
    for i in range(1, n + 1):
        if i % 15 == 0:
            print("FizzBuzz")
        elif i % 3 == 0:
            print("Fizz")
        elif i % 5 == 0:
            print("Buzz")
        else:
            print(i)`,
        testCode: `
fizzbuzz(15)
`,
        expectedOutput: `1
2
Fizz
4
Buzz
Fizz
7
8
Fizz
Buzz
11
Fizz
13
14
FizzBuzz`,
        proOnly: false
    },
    {
        id: 'find-second-largest',
        title: 'Find Second Largest',
        description: 'Write a function that finds the second largest number in an array.',
        difficulty: 'Medium',
        language: 'python',
        starterCode: `def find_second_largest(numbers):
    # Write your code here
    pass`,
        solutionCode: `def find_second_largest(numbers):
    unique = list(set(numbers))
    unique.sort()
    return unique[-2]`,
        testCode: `
print(find_second_largest([1, 5, 3, 9, 2]))
print(find_second_largest([10, 20, 5, 15]))
print(find_second_largest([7, 7, 3, 3, 1]))
`,
        expectedOutput: `5
15
3`,
        proOnly: false
    },
    {
        id: 'anagram-check',
        title: 'Anagram Checker',
        description: 'Write a function that checks if two strings are anagrams (contain the same characters in different order).',
        difficulty: 'Medium',
        language: 'javascript',
        starterCode: `function isAnagram(str1, str2) {
    // Write your code here
}`,
        solutionCode: `function isAnagram(str1, str2) {
    const sorted1 = str1.toLowerCase().split('').sort().join('');
    const sorted2 = str2.toLowerCase().split('').sort().join('');
    return sorted1 === sorted2;
}`,
        testCode: `
console.log(isAnagram("listen", "silent"));
console.log(isAnagram("hello", "world"));
console.log(isAnagram("Triangle", "Integral"));
`,
        expectedOutput: `true
false
true`,
        proOnly: false
    },
    {
        id: 'prime-numbers',
        title: 'Prime Number Generator',
        description: 'Write a function that generates all prime numbers up to n.',
        difficulty: 'Medium',
        language: 'python',
        starterCode: `def generate_primes(n):
    # Write your code here
    pass`,
        solutionCode: `def generate_primes(n):
    primes = []
    for num in range(2, n + 1):
        is_prime = True
        for i in range(2, int(num ** 0.5) + 1):
            if num % i == 0:
                is_prime = False
                break
        if is_prime:
            primes.append(num)
    return primes`,
        testCode: `
print(generate_primes(10))
print(generate_primes(20))
print(generate_primes(5))
`,
        expectedOutput: `[2, 3, 5, 7]
[2, 3, 5, 7, 11, 13, 17, 19]
[2, 3, 5]`,
        proOnly: true
    },
    {
        id: 'binary-search-pro',
        title: 'Binary Search Implementation',
        description: 'Implement binary search algorithm to find an element in a sorted array. Return the index or -1 if not found.',
        difficulty: 'Medium',
        language: 'python',
        starterCode: `def binary_search(arr, target):
    # Write your code here
    pass`,
        solutionCode: `def binary_search(arr, target):
    left, right = 0, len(arr) - 1
    while left <= right:
        mid = (left + right) // 2
        if arr[mid] == target:
            return mid
        elif arr[mid] < target:
            left = mid + 1
        else:
            right = mid - 1
    return -1`,
        testCode: `
print(binary_search([1, 3, 5, 7, 9], 5))
print(binary_search([1, 3, 5, 7, 9], 6))
print(binary_search([2, 4, 6, 8, 10], 2))
`,
        expectedOutput: `2
-1
0`,
        proOnly: true
    },

    // HARD CHALLENGES (4 total, 1 pro)
    {
        id: 'fibonacci',
        title: 'Fibonacci Number',
        description: 'Write a function that returns the nth Fibonacci number.',
        difficulty: 'Hard',
        language: 'typescript',
        starterCode: `function fibonacci(n: number): number {
    // Write your code here
    return 0;
}`,
        solutionCode: `function fibonacci(n: number): number {
    if (n <= 1) return n;
    return fibonacci(n - 1) + fibonacci(n - 2);
}`,
        testCode: `
console.log(fibonacci(5));
console.log(fibonacci(10));
console.log(fibonacci(0));
`,
        expectedOutput: `5
55
0`,
        proOnly: false
    },
    {
        id: 'longest-substring',
        title: 'Longest Substring Without Repeating',
        description: 'Find the length of the longest substring without repeating characters.',
        difficulty: 'Hard',
        language: 'javascript',
        starterCode: `function lengthOfLongestSubstring(s) {
    // Write your code here
}`,
        solutionCode: `function lengthOfLongestSubstring(s) {
    let maxLen = 0;
    let start = 0;
    const seen = new Map();
    
    for (let end = 0; end < s.length; end++) {
        if (seen.has(s[end])) {
            start = Math.max(start, seen.get(s[end]) + 1);
        }
        seen.set(s[end], end);
        maxLen = Math.max(maxLen, end - start + 1);
    }
    return maxLen;
}`,
        testCode: `
console.log(lengthOfLongestSubstring("abcabcbb"));
console.log(lengthOfLongestSubstring("bbbbb"));
console.log(lengthOfLongestSubstring("pwwkew"));
`,
        expectedOutput: `3
1
3`,
        proOnly: false
    },
    {
        id: 'valid-parentheses',
        title: 'Valid Parentheses',
        description: 'Write a function that checks if a string of parentheses is valid (properly opened and closed).',
        difficulty: 'Hard',
        language: 'python',
        starterCode: `def is_valid_parentheses(s):
    # Write your code here
    pass`,
        solutionCode: `def is_valid_parentheses(s):
    stack = []
    mapping = {')': '(', '}': '{', ']': '['}
    for char in s:
        if char in mapping:
            if not stack or stack[-1] != mapping[char]:
                return False
            stack.pop()
        else:
            stack.append(char)
    return len(stack) == 0`,
        testCode: `
print(is_valid_parentheses("()[]{}"))
print(is_valid_parentheses("(]"))
print(is_valid_parentheses("([)]"))
`,
        expectedOutput: `True
False
False`,
        proOnly: false
    },
    {
        id: 'advanced-sorting',
        title: 'Merge Sort Algorithm',
        description: 'Implement the merge sort algorithm to sort an array.',
        difficulty: 'Hard',
        language: 'python',
        proOnly: true,
        starterCode: `def merge_sort(arr):
    # Write your code here
    pass`,
        solutionCode: `def merge_sort(arr):
    if len(arr) > 1:
        mid = len(arr)//2
        L = arr[:mid]
        R = arr[mid:]
        merge_sort(L)
        merge_sort(R)
        i = j = k = 0
        while i < len(L) and j < len(R):
            if L[i] < R[j]:
                arr[k] = L[i]
                i += 1
            else:
                arr[k] = R[j]
                j += 1
            k += 1
        while i < len(L):
            arr[k] = L[i]
            i += 1
            k += 1
        while j < len(R):
            arr[k] = R[j]
            j += 1
            k += 1
    return arr`,
        testCode: `
print(merge_sort([12, 11, 13, 5, 6, 7]))
print(merge_sort([1, 2, 3]))
print(merge_sort([3, 2, 1]))
`,
        expectedOutput: `[5, 6, 7, 11, 12, 13]
[1, 2, 3]
[1, 2, 3]`,
    }
];

export async function GET() {
    try {
        for (const challenge of challengesData) {
            await drizzle_db.insert(challenges).values(challenge).onConflictDoNothing();
        }

        return NextResponse.json({ success: true, message: "Challenges seeded successfully", count: challengesData.length });
    } catch (error) {
        console.error("Error seeding challenges:", error);
        return NextResponse.json({ success: false, error: String(error) }, { status: 500 });
    }
}
