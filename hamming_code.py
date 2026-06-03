class HammingCode:
    def __init__(self, data_str: str):
        # Store data as a list of integers for easier bitwise operations
        self.data = [int(bit) for bit in data_str]
        self.m = len(self.data)
        self.r = self._calculate_parity_bits()

    def _calculate_parity_bits(self) -> int:
        """Finds the number of redundant bits (r) needed."""
        r = 0
        while (1 << r) < self.m + r + 1:
            r += 1
        return r

    def encode(self) -> str:
        """Positions data/parity bits and calculates even parity."""
        # Step 1: Insert placeholders (0) for parity bits and copy data bits
        code = []
        data_idx = 0
        total_bits = self.m + self.r
        
        for i in range(1, total_bits + 1):
            if (i & (i - 1)) == 0:  # Check if 'i' is a power of 2
                code.append(0)
            else:
                code.append(self.data[data_idx])
                data_idx += 1

        # Step 2: Calculate the parity bits
        for i in range(self.r):
            pos = 1 << i
            parity_val = 0
            for j in range(1, total_bits + 1):
                if j & pos:
                    parity_val ^= code[j - 1]
            code[pos - 1] = parity_val

        return "".join(map(str, code))

    @staticmethod
    def detect_error(received_code_str: str) -> int:
        """Detects the position of an error (1-indexed). Returns 0 if none."""
        received = [int(bit) for bit in received_code_str]
        error_pos = 0
        
        # We determine r dynamically based on the received code length
        total_bits = len(received)
        r = 0
        while (1 << r) <= total_bits:
            r += 1

        for i in range(r):
            pos = 1 << i
            parity_val = 0
            for j in range(1, total_bits + 1):
                if j & pos:
                    parity_val ^= received[j - 1]
            
            if parity_val != 0:
                error_pos += pos

        return error_pos


# --- Execution Example ---
if __name__ == "__main__":
    user_data = input("Enter data: ")
    
    # Initialize and Encode
    hamming = HammingCode(user_data)
    encoded_msg = hamming.encode()
    print(f"Hamming Code: {encoded_msg}")

    # Error Detection
    received = input("Enter received code: ")
    error_position = HammingCode.detect_error(received)

    if error_position == 0:
        print("No error detected.")
    else:
        print(f"Error detected at position: {error_position}")