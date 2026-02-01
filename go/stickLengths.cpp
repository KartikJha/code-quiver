#include <bits/stdc++.h>
using namespace std;

struct StickLengthsStruct {
    long long N;
    vector<long long> Nums;
};

long long StickLengths(StickLengthsStruct* sLS) {
    long long operations = LLONG_MAX;
    unordered_map<long long, bool> seen;

    for (long long n : sLS->Nums) {
        bool isSeen = seen[n];

        if (!isSeen) {
            long long currOps = 0;
            seen[n] = true;

            for (long long n1 : sLS->Nums) {
                currOps += llabs(n - n1);
            }

            if (operations > currOps) {
                operations = currOps;
            }
        }
    }

    return operations;
}

int main() {
    StickLengthsStruct sLS;

    // Read n
    cin >> sLS.N;
    cin.ignore(); // consume newline

    // Read comma-separated integers
    string line;
    getline(cin, line);

    stringstream ss(line);
    string token;

    while (getline(ss, token, ',')) {
        sLS.Nums.push_back(stoll(token));
    }

    long long result = StickLengths(&sLS);
    cout << result << endl;

    return 0;
}

