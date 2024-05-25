
import java.util.*;


public class index {
	// q 14 take number from user and check its pelidrom 
	public static void Q_14(){

		Scanner sc = new Scanner(System.in);
			int n = sc.nextInt();
			
		int number = n;
		int sum = 0;
		int init = 0;
		while (n > 0 ) {

			 int last_digit = n % 10;
			 init =  init*10 + last_digit;
			 n = n/10;
		}
		sum = init;
		System.out.println("sum = " + sum  + " & " + n);
		if(sum == number){
			System.out.println("yes this number is pelindrom Noice");

		}else{
			System.out.println("no this number is pelindrom!!!!!");
		}
		System.out.println("hiii");
		System.out.println("sum = " + init);
	}
	
	
//    q 18 add two matrics
	public static void Q_18(){
		int arr1[][] = { {1,2}          ,
		                 {2,3}
						};
		int arr2[][] = { {1,2} ,{ 2,3}};
		int arr3[][] = new int[arr1[0].length][arr1[0].length];

		// System.out.println(arr1.length); ==> row 
		// System.out.println(arr1[0].length); ==> colum 

		for(int i =0 ;i <arr1.length; i++){

			for(int j = 0 ; j<arr1[0].length;j++){
			arr3[i][j] = arr1[i][j] + arr2[i][j];
			}

		}

		// printing two dimensions array 
		for(int i =0 ;i <arr1.length; i++){

			for(int j = 0 ; j<arr1[0].length;j++){
			System.out.print(arr3[i][j] + " ");
			}
			System.out.println();

		}
	}
	
	public static void main(String[] args) {
		
        //   Q_14(); 
		// Q_18();
		
		



	}
}