def display_welcome():
    """Display the welcome message"""
    print("\n" + "="*50)
    print("Think of a number between 1 and 63.")
    print("Six cards will be displayed. After")
    print("the last one, your number is revealed.")
    print("="*50 + "\n")

def display_card(card_number, numbers):
    """Display a card with numbers"""
    print(f"\n{' CARD ' + str(card_number).center(50, '=')}\n")
    
    # Format numbers in rows of 8
    for i in range(0, len(numbers), 8):
        row = numbers[i:i+8]
        print(" ".join(f"{num:2}" for num in row))
    
    print("\n" + "="*50 + "\n")

def get_user_response():
    """Get user response (Yes/No)"""
    while True:
        response = input("Is your number shown above? (Yes/No/Restart): ").strip().lower()
        if response in ['y', 'yes']:
            return 1
        elif response in ['n', 'no']:
            return 0
        elif response == 'restart':
            return -1
        else:
            print("Please enter 'Yes', 'No', or 'Restart'.")

def binary_to_decimal(binary_digits):
    """Convert binary digits list to decimal number"""
    # Reverse the list to process from least significant bit (card 1) to most (card 6)
    return sum(digit * (2**i) for i, digit in enumerate(binary_digits))

def play_game():
    """Main game function"""
    # Define the numbers for each card (1-6)
    cards = {
        1: [1, 3, 5, 7, 9, 11, 13, 15, 17, 19, 21, 23, 25, 27, 29, 31,
            33, 35, 37, 39, 41, 43, 45, 47, 49, 51, 53, 55, 57, 59, 61, 63],
        2: [2, 3, 6, 7, 10, 11, 14, 15, 18, 19, 22, 23, 26, 27, 30, 31,
            34, 35, 38, 39, 42, 43, 46, 47, 50, 51, 54, 55, 58, 59, 62, 63],
        3: [4, 5, 6, 7, 12, 13, 14, 15, 20, 21, 22, 23, 28, 29, 30, 31,
            36, 37, 38, 39, 44, 45, 46, 47, 52, 53, 54, 55, 60, 61, 62, 63],
        4: [8, 9, 10, 11, 12, 13, 14, 15, 24, 25, 26, 27, 28, 29, 30, 31,
            40, 41, 42, 43, 44, 45, 46, 47, 56, 57, 58, 59, 60, 61, 62, 63],
        5: [16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31,
            48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 58, 59, 60, 61, 62, 63],
        6: [32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47,
            48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 58, 59, 60, 61, 62, 63]
    }
    
    while True:
        display_welcome()
        binary_digits = []
        
        for card_num in range(1, 7):
            display_card(card_num, cards[card_num])
            response = get_user_response()
            
            if response == -1:  # Restart
                print("\nRestarting game...\n")
                break
            
            binary_digits.append(response)
            
            # If we've processed all 6 cards
            if card_num == 6:
                number = binary_to_decimal(binary_digits)
                print("\n" + "="*50)
                print(f"THE NUMBER YOU WERE THINKING OF WAS [{number}]")
                print("="*50 + "\n")
                
                play_again = input("Would you like to play again? (Yes/No): ").strip().lower()
                if play_again not in ['y', 'yes']:
                    print("\nThanks for playing!")
                    return

if __name__ == "__main__":
    play_game()