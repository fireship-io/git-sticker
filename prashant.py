def get_matrix_input(matrix_name):
    """
    Accepts user input for a 3x3 matrix.

    Parameters:
    matrix_name (str): The name of the matrix to display for user input.

    Returns:
    list of list of int/float: The input 3x3 matrix.
    """
    print(f"Enter the elements of {matrix_name} row by row (3 numbers per row):")
    matrix = []
    for i in range(3):
        row = list(map(float, input(f"Row {i + 1}: ").split()))
        if len(row) != 3:
            raise ValueError("Each row must contain exactly 3 elements.")
        matrix.append(row)
    return matrix

def multiply_matrices(matrix1, matrix2):
    """
    Multiplies two 3x3 matrices.

    Parameters:
    matrix1 (list of list of int/float): The first 3x3 matrix.
    matrix2 (list of list of int/float): The second 3x3 matrix.

    Returns:
    list of list of int/float: The resulting 3x3 matrix after multiplication.
    """
    result = [[0 for _ in range(3)] for _ in range(3)]

    for i in range(3):
        for j in range(3):
            for k in range(3):
                result[i][j] += matrix1[i][k] * matrix2[k][j]

    return result

# Get matrices from user
print("Matrix Multiplication Program for 3x3 Matrices")
matrix1 = get_matrix_input("Matrix 1")
matrix2 = get_matrix_input("Matrix 2")

# Multiply matrices
result_matrix = multiply_matrices(matrix1, matrix2)

# Display the result
print("\nResulting Matrix:")
for row in result_matrix:
    print(" ".join(map(str, row)))
