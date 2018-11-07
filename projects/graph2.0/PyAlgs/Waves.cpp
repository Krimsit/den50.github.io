#include <iostream>
#include <queue>
using namespace std;
 
/* нахождение пути*/
void find_path(int n, int row, int col, char** lab, int** visited, int** path, queue<int>& plan){
    if(!visited[row][col]){
        /* проверяем не вышли ли мы за границы лабиринта, есть ли клетка 
        в массиве посещенных и можно ли через нее пройти*/
        if ((row+1) < n && (row+1) >= 0 && !visited[row+1][col] &&
            (lab[row+1][col] == '.' || lab[row+1][col] == 'X')) {
                path[row+1][col] = path[row][col] + 1;
                plan.push(row+1);
                plan.push(col);
        }
        if((row-1) < n && (row-1) >= 0 && !visited[row-1][col] && 
            (lab[row-1][col] == '.' || lab[row-1][col] == 'X')) {
                path[row-1][col] = path[row][col] + 1;
                plan.push(row-1);
                plan.push(col);
        }
        if((col + 1) < n && (col + 1) >= 0 && !visited[row][col+1] && 
            (lab[row][col+1] == '.' || lab[row][col+1] == 'X')) {
                path[row][col+1] = path[row][col] + 1;
                plan.push(row);
                plan.push(col+1);
        }
        if((col - 1) < n && (col - 1) >= 0 && !visited[row][col-1] && 
            (lab[row][col-1] == '.' || lab[row][col-1] == 'X')) {
                path[row][col-1] = path[row][col] + 1;
                plan.push(row);
                plan.push(col-1);
        }
        visited[row][col] = 1; /* отмечаем клетку в которой побывали */
    }
}
 
int main() {
    int n, x_start, y_start, x_end, y_end, x, y;
    queue <int> plan; 
    cin >> n;
    char** lab = new char* [n];
    int** visited = new int * [n];
    int** path = new int * [n];
    for(int i=0; i<n; i++){
        lab[i] = new char [n];   /* массив для хранения лабиринта */
        visited[i] = new int [n]; /* массив для хранения информации о посещении клеток*/
        path[i] = new int [n];  /* массив для хранения найденных путей */
        for(int j=0; j<n; j++){
            visited[i][j] = 0;  
            path[i][j] = -1;   
            cin >> lab[i][j]; 
            if (lab[i][j] == '@') { /* находим начало пути*/
                x_start = i;
                y_start = j;
                plan.push(i);  /* заносим начальную клетку */
                plan.push(j);  /* в план посещения */
                path[i][j] = 1;
            }
            else if (lab[i][j] == 'X') { /* находим конечную точку */
                x_end = i;
                y_end = j;
            }
        }
    }
    while(!plan.empty()){ /* пока очередь посещения клеток непустая*/
        x=plan.front();
        plan.pop();
        y=plan.front();
        plan.pop();
        find_path(n, x, y, lab, visited, path, plan); /* продолжаем поиск пути*/
    }
    if(!visited[x_end][y_end]){
        cout << "N" << endl;
    }
    else {
        cout << "Y" << endl;
            x = x_end;
            y = y_end;
            lab[x][y] = '+';
            while (path[x][y] != 2) { /* восстановление пути*/
                if ((x-1) >= 0 && (x-1) < n && (path[x-1][y] == path[x][y] - 1)) {
                    x = x-1;
                    lab[x][y] = '+';
                }
                else if ((x+1) >= 0 && (x+1) < n && (path[x+1][y] == path[x][y] - 1)) {
                    x = x+1;
                    lab[x][y] = '+';
                }
                else if ((y-1) >= 0 && (y-1) < n && (path[x][y-1] == path[x][y] - 1)) {
                    y = y-1;
                    lab[x][y] = '+';
                }
                else if ((y+1) >= 0 && (y+1) < n && (path[x][y+1] == path[x][y] - 1)) {
                    y = y+1;
                    lab[x][y] = '+';
                }
            }
            for (int i = 0; i < n; i++) {
                for (int j = 0; j < n; j++) {
                    cout << lab[i][j];
                }
                cout << endl;
            }
        }
    return 0;
}