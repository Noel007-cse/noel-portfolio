import java.util.*;
import java.io.*;

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(new File(""));
        
        int[] ar = new int[5];
        
        for(int i = 0 ; i < 5 ; i++){
            if(!sc.hasNextInt()){
                System.out.println("Invalid Input");
            }
            ar[i] = sc.nextInt();
        }
        
    
    }
}