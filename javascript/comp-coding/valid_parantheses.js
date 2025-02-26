/**
 * @param {string} s
 * @return {boolean}
 */
var isValid = function (s) {
    let stack = [];

    stack[0] = s[0];

    for ( let i = 1; i < s.length; i++) {
        const top = stack[stack.length - 1];

        const currentC = s[i];

        stack = updateStack(stack, top, currentC);
    }
    return stack.length == 0;
};


function updateStack(s, t, cC) {
    console.log(s, t, cC);

    if (cC == '(') {
        if (t == ')') {
            s.pop();
        } else {
            s.push(cC);
        }
    } else if (cC = '[') {
        if (t == ']') {
            s.pop();
        } else {
            s.push(cC);
        }
    } else if (cC = '{') {
        if (t == '}') {
            s.pop();
        } else {
            s.push(cC);
        }
    } else if (cC = ']') {
        if (t == '[') {
            s.pop();
        } else {
            s.push(cC);
        }
    } else if (cC = ')') {
        if (t == '(') {
            s.pop();
        } else {
            s.push(cC);
        }
    } else if (cC = '}') {
        if (t == '{') {
            s.pop();
        } else {
            s.push(cC);
        }
    } else {
        s.push(cC);
    }

    console.log(s);

    return s;
}


console.log(isValid("()"));