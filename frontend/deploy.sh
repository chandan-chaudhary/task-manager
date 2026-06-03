set -e

NAME="task-manager-frontend"
USERNAME="debian476"
IMAGE="$USERNAME/frontend-server:latest"

echo "Building production image using Docker Compose..."

docker compose --profile prod build

echo "Tagging image..."

docker tag frontend-server:latest $IMAGE

echo "Pushing image..."

docker push $IMAGE

# creat secret for images
echo "Creating Kubernetes secret: frontend-secrets"
kubectl create secret generic frontend-secrets \
  --from-env-file=.env \
  --dry-run=client -o yaml | kubectl apply -f -

# apply the Kubernetes deployment and service
echo "Applying Kubernetes deployment and service"
kubectl apply -f k8s/deployment.yaml
kubectl apply -f k8s/services.yaml

echo "Deployment and service applied successfully"

# get pods
echo "Getting pods"
kubectl get pods

# GET services
echo "Getting services"
kubectl get services

#GET MAIN SERIVES
echo "Getting main services"
kubectl get service $NAME-service

# START THE APPLICATION
echo "Starting the application"
minikube service $NAME-service
