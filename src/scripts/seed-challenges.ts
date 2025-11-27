import { drizzle_db } from "@/lib/db";
import { challenges } from "@/lib/schema";

const challengesData = [
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
        id: 'advanced-sorting',
        title: 'Advanced Sorting',
        description: 'Implement a merge sort algorithm.',
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

async function seedChallenges() {
    try {
        console.log("Seeding challenges...");

        for (const challenge of challengesData) {
            await drizzle_db.insert(challenges).values(challenge).onConflictDoNothing();
            console.log(`✓ Seeded challenge: ${challenge.title}`);
        }

        console.log("✓ All challenges seeded successfully!");
    } catch (error) {
        console.error("Error seeding challenges:", error);
    }
}

seedChallenges();
