#include <iostream>
#include <algorithm>
#include <fstream>
 
//Максимальное значение веса = 100
#define INF 101
 
using namespace std;
 
void printMatrix(int** matrix, int numberOfVert) {
    for(int i = 0; i < numberOfVert; i++) {
        for(int j = 0; j < numberOfVert; j++) {
            if(matrix[i][j] == INF) {
                cout << "INF" << " ";
            }
            else {
                cout << matrix[i][j] << " ";
            }
        }
        cout << endl;
    }
}
 
//matrix - матрица смежности
void originalFloydWarshall(int **matrix, int numberOfVert) {
    //Пробегаемся по всем вершинам и ищем более короткий путь
    //через вершину k
    for(int k = 0; k < numberOfVert; k++) {
        for(int i = 0; i < numberOfVert; i++) {
            for(int j = 0; j < numberOfVert; j++) {
                //Новое значение ребра равно минимальному между старым
                //и суммой ребер i <-> k + k <-> j (если через k пройти быстрее)
                matrix[i][j] = min(matrix[i][j], matrix[i][k] + matrix[k][j]);
            }
        }
    }
     
    return;
}
 
int main(int argc, char** argv) {
    ifstream file("matrix");
    int numberOfVert;
    file >> numberOfVert;
    cout << numberOfVert << endl;
     
    //Матрица смежности с весами ребер графа(101 - ребра нет, 0 ребро в себя)
    int **matrix = (int**)malloc(sizeof(int)*numberOfVert);
    for(int i = 0; i < numberOfVert; i++) {
        matrix[i] = (int *) malloc(sizeof(int) * numberOfVert);
    }
     
    //Считываем матрицу весов ребер
    for(int i = 0; i < numberOfVert; i++) {
        for(int j = 0; j < numberOfVert; j++) { file >> matrix[i][j];
        }
    }
     
    file.close();
     
    cout << "Old matrix" << endl;
    printMatrix(matrix, numberOfVert);
     
    originalFloydWarshall(matrix, numberOfVert);
     
    cout << "New matrix" << endl;
     
    printMatrix(matrix, numberOfVert);
     
    return 0;
}