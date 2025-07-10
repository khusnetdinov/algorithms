use std::io;
use std::io::BufRead;

fn solve(size: usize, a: &[i32], b: &[i32]) -> Vec<i32> {
    let mut result = Vec::with_capacity(size * 2);

    for i in 0..size {
        result.push(a[i]);
        result.push(b[i]);
    }

    result
}

fn main() {
    let stdin = io::stdin();
    let mut lines = stdin.lock().lines();

    let n: usize = lines.next().unwrap().unwrap().trim().parse().unwrap();

    let a: Vec<i32> = lines
        .next()
        .unwrap()
        .unwrap()
        .split_whitespace()
        .map(|s| s.parse().unwrap())
        .collect();

    let b: Vec<i32> = lines
        .next()
        .unwrap()
        .unwrap()
        .split_whitespace()
        .map(|s| s.parse().unwrap())
        .collect();

    let result = solve(n, &a, &b);
    let as_string =
        result
        .iter()
        .map(|x| x.to_string())
        .collect::<Vec<_>>()
        .join(" ");

    println!("==> {}", as_string);
}
