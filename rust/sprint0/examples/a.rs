use std::io;
use std::io::BufRead;

fn main() {
    let stdin = io::stdin();
    let mut lines = stdin.lock().lines();

    // Читаем первое число
    let a: i32 = lines.next()
        .expect("Failed to read first line")
        .expect("First line is empty")
        .trim()
        .parse()
        .expect("First line is not a number");

    // Читаем второе число
    let b: i32 = lines.next()
        .expect("Failed to read second line")
        .expect("Second line is empty")
        .trim()
        .parse()
        .expect("Second line is not a number");

    let result = solve(a, b);

    // Вычисляем и выводим результат
    println!("==> {}", result);
}

fn solve(a: i32, b: i32) -> i32 {
    a + b
}
