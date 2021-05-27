function f() {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve();
        }, 2000);
    })
}

let p;

/*
3 promises are created
and all of them are running parallely
No one is waiting for no one
 */
for (let i = 0; i < 3; i++) {


    p = f();

    p.then(() => {
        console.log("resolved " + i);
    });
}